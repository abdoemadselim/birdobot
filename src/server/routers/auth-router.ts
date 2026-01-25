import { userTable } from "@/server/db/schema"
import { j, publicProcedure } from "../jstack"
import { currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

export const authRouter = j.router({
  // Procedure
  // c: hono context (contains its different functions, headers, env variables, etc.)
  // the project context: the db instance set via a middleware or the user instance after checking if it's authentication in a middleware, etc.
  // input: validated input
  getDatabaseSyncStatus: publicProcedure.get(async ({ c, ctx, input }) => {
    const { db } = ctx
    const user = await currentUser()

    if (!user) {
      return c.json({ isSync: false })
    }

    const dbUser = (await db
      .select()
      .from(userTable)
      .where(eq(userTable.externalId, user.id)))[0]

    if (!dbUser) {
      return c.json({ isSync: false })
    }

    return c.json({ isSync: true })
  }),
})
