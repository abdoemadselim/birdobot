import z from "zod";

export const EVENT_CATEGORY_NAME_VALIDATOR =
    z.string()
        .min(1, "Category name is required.")
        .regex(/^[a-zA-Z0-9-]+$/, "Category name can only contain letters, numbers, or '_'")

export const EVENT_CATEGORY_VALIDATOR = z.object({
    name: EVENT_CATEGORY_NAME_VALIDATOR,
    color: z.string().min(1, "Category color is required.").regex(/^#[0-9A-Z]{6}$/i, "Invalid color format."),
    emoji: z.string().emoji("Invalid emoji.").optional(),
    channels: z.array(z.enum(["discord", "telegram", "slack", "whatsapp", "email"])).min(1, "At least one channel is required")
})

export const FIELD_RULES_VALIDATOR = z.object({
    name: z.string(),
    type: z.enum(["text", "number"]),
    rule: z.enum(["eq", "neq", "gt", "gte", "lt", "lte", "contains", "notContain", "startsWith", "endsWith"]),
    value: z.string().or(z.number()),
    relevance: z.enum(["and", "or"])
})

export const UPDATE_EVENT_CATEGORY_VALIDATOR = EVENT_CATEGORY_VALIDATOR.extend({
    id: z.number(),
    fieldRules: z.array(FIELD_RULES_VALIDATOR),
    telegramId: z.string().optional(),
    discordId: z.string().optional(),
    slackId: z.string().optional(),
    whatsappNumber: z.string().optional(),
    emailAddress: z.string().email().max(255).optional()
})

export type UPDATE_EVENT_CATEGORY_TYPE = z.infer<typeof UPDATE_EVENT_CATEGORY_VALIDATOR>
export type FIELD_RULES_TYPE = z.infer<typeof FIELD_RULES_VALIDATOR>