import { eq, sql } from "drizzle-orm";
import { eventCategory, userTable } from "@/server/db/schema";
import { j, privateProcedure } from "../jstack";

export const eventCategoryRouter = j.router({
    getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
        const { db } = ctx;

        // event category with most recent event date (this month)
        const eventCategoryQuery = sql.raw(`
               SELECT DISTINCT ON (ec.id)
                ec.id,
                e."createdAt" AS event_date,
                ec.name, 
                ec.emoji,
                ec.color, 
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
                ORDER BY
                ec.id,
                e."createdAt" DESC;
            `)

        // the count of events for each event category (this month)
        const eventsCountQuery = sql.raw(`
                SELECT COUNT(*), e."eventCategoryId" as id
                FROM event as e
                WHERE e."createdAt" >= date_trunc('month', CURRENT_DATE)
                AND e."createdAt" <  date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'
                GROUP BY e."eventCategoryId";
            `)

        // the count of unique fields of all events of each event category type (this month)
        const eventsUniqueFieldsQuery = sql.raw(
            `SELECT
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
                GROUP BY ec.id, ec.name;
            `
        )

        const [eventCategoriesResult, eventsCountResult, eventsUniqueFieldsResult] = (await Promise.all([
            db.execute(eventCategoryQuery),
            db.execute(eventsCountQuery),
            db.execute(eventsUniqueFieldsQuery),
        ])
        ).map(({ rows }) => rows)

        const merged = eventCategoriesResult?.map(eventCategory => {
            // Find count and unique fields for this category
            const countObj = eventsCountResult?.find(c => c.id === eventCategory.id);
            const uniqueFieldsObj = eventsUniqueFieldsResult?.find(u => u.id === eventCategory.id);

            return {
                ...eventCategory,
                events_this_month_count: countObj ? Number(countObj.count) : 0,
                unique_field_keys: uniqueFieldsObj ? Number(uniqueFieldsObj.unique_field_keys) : 0
            };
        });

        c.superjson({ eventsCategories: merged })
    })
})