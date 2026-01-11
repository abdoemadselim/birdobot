import { currentUser } from "@clerk/nextjs/server"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { env } from "hono/adapter"
import { HTTPException } from "hono/http-exception"
import { jstack } from "jstack"
import { db } from "./db"
import { userTable } from "./db/schema"
import { eq } from "drizzle-orm"

// Add type safety to env variables to fail early at build time instead of crashing at runtime
interface Env {
  Bindings: { DATABASE_URL: string }
}

export const j = jstack.init<Env>()

/**
 * Type-safely injects database into all procedures
 * 
 * @see https://jstack.app/docs/backend/middleware
 */
const databaseMiddleware = j.middleware(async ({ c, next }) => {
  const { DATABASE_URL } = env(c)

  const sql = neon(DATABASE_URL)
  const db = drizzle(sql)

  return await next({ db })
})

const authMiddleware = j.middleware(async ({ c, ctx, next }) => {
  const authorizationHeader = c.req.header("birdo-api-key")

  const apiKey = authorizationHeader?.split(" ")[1]

  if (apiKey) {
    const user = (await db.select()
      .from(userTable)
      .where(eq(userTable.apiKey, apiKey)))[0]

    if (user) {
      return await next({ user })
    }
  }

  const auth = await currentUser()

  if (!auth) {
    throw new HTTPException(401, {
      message: "Unauthorized, sign in to continue.",
    })
  }

  const user = (await db.select()
    .from(userTable)
    .where(eq(userTable.externalId, auth.id)))[0]

  return await next({ user })
})

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const publicProcedure = j.procedure.use(databaseMiddleware)
export const privateProcedure = publicProcedure.use(authMiddleware)