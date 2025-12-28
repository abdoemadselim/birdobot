import { userTable } from "@/server/db/schema"
import { j, privateProcedure } from "../jstack"
import { currentUser } from "@clerk/nextjs/server"

export const authRouter = j.router({
  // Procedure
  // c: hono context (contains its different functions, headers, env variables, etc.)
  // the project context: the db instance set via a middleware or the user instance after checking if it's authentication in a middleware, etc.
  // input: validated input
  getDatabaseSyncStatus: privateProcedure.get(async ({ c, ctx, input }) => {
    const { db } = ctx
    const user = await currentUser()

    if (!user) {
      return c.json({ isSync: false })
    }

    const [users] = await db
      .select()
      .from(userTable)
      .limit(1)

    if (!users) {
      await db
        .insert(userTable).values({
          externalId: user.id,
          email: user.emailAddresses[0]?.emailAddress!,
          quotaLimit: 100
        })

      return c.json({ isSync: true })
    }

    return c.json({ isSync: true })
  }),
})
