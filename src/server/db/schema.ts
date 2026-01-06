import {
  pgTable,
  serial,
  text,
  timestamp,
  index,
  varchar,
  uuid,
  pgEnum,
  integer,
  unique,
  jsonb
} from "drizzle-orm/pg-core"

export const planEnum = pgEnum("plan", ["FREE", "PRO"])
export const deliveryStatusEnum = pgEnum("deliveryStatusEnum", ["PENDING", "FAILED", "DELIVERED"])

export const userTable = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    externalId: text("externalId"),

    email: varchar("email", { length: 255 }).unique().notNull(),

    discordId: varchar("discordId", { length: 255 }),

    apiKey: uuid("apiKey").defaultRandom(),

    plan: planEnum("plan").default("FREE"),

    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),

    quotaLimit: integer("quotaLimit")
  },
  (table) => [
    index("apiKey_idx").on(table.apiKey),
    index("email_idx").on(table.email)
  ]
)

export const eventCategoryTable = pgTable(
  "eventCategory",
  {
    id: serial("id").primaryKey(),
    userId: integer("userId").references(() => userTable.id),

    name: varchar("name", { length: 100 }).notNull(),
    emoji: varchar("emoji", { length: 32 }),
    color: integer("color"),

    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => [
    unique("event_name_user_id").on(table.name, table.userId)
  ]
)

export const eventTable = pgTable(
  "event",
  {
    id: serial("id").primaryKey(),
    userId: integer("userId").references(() => userTable.id),

    name: varchar("name", { length: 255 }),
    formattedMessage: text("formattedMessage"),
    fields: jsonb("fields"),

    eventCategoryId: integer("eventCategoryId").references(() => eventCategoryTable.id, { onDelete: "cascade" }),

    deliveryStatus: deliveryStatusEnum("deliveryStatus").default("PENDING"),

    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => [
    index("createdAt_idx").on(table.createdAt),
    index("fields_idx").on(table.fields)
  ]
)

export const quotaTable = pgTable(
  "quota",
  {
    id: serial("id").primaryKey(),
    userId: integer("userId").references(() => userTable.id),

    count: integer("count").default(0),
    month: integer("month"),
    year: integer("year"),

    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  }
)