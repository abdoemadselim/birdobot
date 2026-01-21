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
  jsonb,
  boolean
} from "drizzle-orm/pg-core"

export const featureEnum = pgEnum("feature", ["EVENTS", "EVENTS_CATEGORIES"])
export const deliveryStatusEnum = pgEnum("deliveryStatusEnum", ["PENDING", "FAILED", "DELIVERED"])
export const channelEnum = pgEnum("discord", ["discord", "telegram", "slack"])
export const paymentStatusEnum = pgEnum("paymentStatus", ["PENDING", "COMPLETED", "CANCELLED"])

export const userTable = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    externalId: text("externalId"),

    email: varchar("email", { length: 255 }).unique().notNull(),

    discordId: varchar("discordId", { length: 30 }),
    telegramId: varchar("telegramId", { length: 30 }),
    slackId: varchar("slackId", { length: 30 }),

    slackBotToken: text("slackBotToken"),

    telegramToken: uuid("telegramToken").defaultRandom(),

    apiKey: uuid("apiKey").defaultRandom(),

    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
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
    userId: integer("userId").references(() => userTable.id, { onDelete: "cascade" }),

    name: varchar("name", { length: 100 }).notNull(),
    emoji: varchar("emoji", { length: 32 }),
    color: integer("color").notNull(),
    channels: channelEnum("channels").array().notNull().default(["discord"]),

    enabled: boolean().default(true),

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
    userId: integer("userId").references(() => userTable.id, { onDelete: "cascade" }),

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

export const userCreditsTable = pgTable(
  "userCredits",
  {
    id: serial("id").primaryKey(),
    userId: integer("userId").references(() => userTable.id, { onDelete: "cascade" }),
    featureKey: featureEnum("featureKey").notNull(),
    balance: integer("balance").default(0).notNull(),
  },
  (table) => [
    unique("user_feature_key").on(table.userId, table.featureKey)
  ]
)

export const paymentTable = pgTable(
  "payment",
  {
    id: serial("id").primaryKey(),
    userId: integer("userId").references(() => userTable.id, { onDelete: "cascade" }),
    status: paymentStatusEnum("status").default("PENDING"),
    transactionId: varchar("transactionId", { length: 100 }).unique(),
    total: integer("total"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    package: varchar("package").notNull()
  },
)