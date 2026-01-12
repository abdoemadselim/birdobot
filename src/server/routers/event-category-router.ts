// Libs
import { and, eq, InferSelectModel, sql } from "drizzle-orm";
import { eventCategoryTable, userTable } from "@/server/db/schema";
import { j, privateProcedure } from "../jstack";
import z from "zod";

// Schemas
import { EVENT_CATEGORY_VALIDATOR } from "@/lib/schemas/category-event";

// Utils
import { parseColor } from "@/lib/utils";
import { _success } from "zod/v4/core";

export const eventCategoryRouter = j.router({
    getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
        const { db, user } = ctx;

        // event category with most recent event date (this month)
        const eventCategoryQuery = sql`
               SELECT DISTINCT ON (ec.id)
                ec.id,
                e."createdAt" AS event_date,
                ec.name, 
                ec.emoji,
                ec.color, 
                ec.channels,
                ec."createdAt"
                FROM (
                SELECT *
                FROM event
                WHERE
                event."createdAt" >= date_trunc('month', CURRENT_DATE)
                AND event."createdAt" <  date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'
                ) AS e
                RIGHT JOIN "eventCategory" AS ec
                ON ec.id = e."eventCategoryId"
                WHERE ec."userId" = ${user?.id}
                ORDER BY
                ec.id,
                e."createdAt" DESC;
            `

        // the count of events for each event category (this month)
        const eventsCountQuery = sql`
                SELECT COUNT(*), e."eventCategoryId" as id
                FROM event as e
                WHERE e."userId"=${user?.id} AND e."createdAt" >= date_trunc('month', CURRENT_DATE)
                AND e."createdAt" <  date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'
                GROUP BY e."eventCategoryId";
            `

        // the count of unique fields of all events of each event category type (this month)
        const eventsUniqueFieldsQuery = sql`
                SELECT
                ec.id,
                COUNT(DISTINCT key) AS unique_field_keys
                FROM "eventCategory" AS ec
                LEFT JOIN (
                SELECT *
                FROM event
                WHERE
                    event."createdAt" >= date_trunc('month', CURRENT_DATE)
                    AND event."createdAt" <  date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'
                ) AS e
                ON ec.id = e."eventCategoryId"
                LEFT JOIN LATERAL jsonb_object_keys(e.fields::jsonb) AS key ON TRUE
                WHERE ec."userId"=${user?.id}
                GROUP BY ec.id, ec.name;
            `

        const [eventCategoriesResult, eventsCountResult, eventsUniqueFieldsResult] = (await Promise.all([
            db.execute(eventCategoryQuery),
            db.execute(eventsCountQuery),
            db.execute(eventsUniqueFieldsQuery),
        ])
        ).map(({ rows }) => rows)

        const merged = (eventCategoriesResult?.map((eventCategory) => {
            // Find count and unique fields for this category
            const countObj = eventsCountResult?.find(c => c.id === eventCategory.id);
            const uniqueFieldsObj = eventsUniqueFieldsResult?.find(u => u.id === eventCategory.id);

            // The channels array is returned as `{discord,telegram}` from postgresql
            let eventCategoryChannels = (eventCategory as Record<string, any>)["channels"].slice(1, -1).split(",")

            return {
                info: { ...eventCategory, channels: eventCategoryChannels },
                events_count: countObj ? Number(countObj.count) : 0,
                unique_field_count: uniqueFieldsObj ? Number(uniqueFieldsObj.unique_field_keys) : 0
            };
        })) as unknown as {
            info: InferSelectModel<typeof eventCategoryTable> & { event_date: string },
            events_count: number,
            unique_field_count: number
        }[] || []


        return c.superjson({ eventsCategories: merged })
    }),

    deleteEventCategory: privateProcedure
        .input(z.object({ categoryName: z.string() }))
        .mutation(async ({ c, ctx, input }) => {
            const { user, db } = ctx;
            const { categoryName } = input;

            if (!user) return c.json({ success: false })

            await db
                .delete(eventCategoryTable)
                .where(
                    and(
                        eq(eventCategoryTable.userId, user.id),
                        eq(eventCategoryTable.name, categoryName)
                    ))
                .returning({ deletedId: eventCategoryTable.id })

            return c.json({ success: true })
        }),

    createEventCategory: privateProcedure
        .input(EVENT_CATEGORY_VALIDATOR)
        .mutation(async ({ c, ctx, input }) => {
            const { user, db } = ctx
            const { name, color, emoji, channels } = input

            // TODO: HANDLE PAID PLANS

            const eventCategory = await db
                .insert(eventCategoryTable)
                .values({
                    name: name.toLowerCase(),
                    color: parseColor(color),
                    emoji: emoji,
                    channels: channels,
                    userId: user?.id
                })
                .returning({
                    id: eventCategoryTable.id,
                    name: eventCategoryTable.name,
                    emoji: eventCategoryTable.emoji,
                    color: eventCategoryTable.color,
                    channels: eventCategoryTable.channels
                })

            return c.json({ success: true, eventCategory: eventCategory[0] })
        }),

    insertQuickStartCategories: privateProcedure.mutation(async ({ c, ctx }) => {
        const { user, db } = ctx;

        await db
            .insert(eventCategoryTable)
            .values([
                {
                    name: "bug",
                    userId: user?.id,
                    color: 0x2ECC71,
                    emoji: "🐛",
                    channels: ["discord", "telegram"]
                },
                {
                    name: "sale",
                    userId: user?.id,
                    color: 0xFF6B6B,
                    emoji: "💰",
                    channels: ["discord", "slack"]
                },
                {
                    name: "signup",
                    userId: user?.id,
                    color: 0x6C5CE7,
                    emoji: "👤",
                    channels: ["discord"]
                }
            ])

        return c.json({ _success: true })
    })
})