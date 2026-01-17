import { featureEnum, userCreditsTable, userTable } from "@/server/db/schema"
import { j, privateProcedure, publicProcedure } from "../jstack"
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
      const newUser = (await db
        .insert(userTable).values({
          externalId: user.id,
          email: user.emailAddresses[0]?.emailAddress!,
        }).returning({
          id: userTable.id,
        }))[0]

      if (!newUser) {
        return c.json({ isSync: false })
      }

      await db.insert(userCreditsTable).values({
        featureKey: "EVENTS",
        balance: 100,
        userId: newUser?.id
      })

      await db.insert(userCreditsTable).values({
        featureKey: "EVENTS_CATEGORIES",
        balance: 3,
        userId: newUser?.id
      })

      return c.json({ isSync: true })
    }

    return c.json({ isSync: true })
  }),
})
