import z from "zod";

export const EVENT_CATEGORY_NAME_VALIDATOR =
    z.string()
        .min(1, "Category name is required.")
        .regex(/^[a-zA-Z0-9-]+$/, "Category name can only contain letters, numbers, or '_'")

export const EVENT_CATEGORY_VALIDATOR = z.object({
    name: EVENT_CATEGORY_NAME_VALIDATOR,
    color: z.string().min(1, "Category color is required.").regex(/^#[0-9A-Z]{6}$/i, "Invalid color format."),
    emoji: z.string().emoji("Invalid emoji.").optional(),
    channels: z.array(z.enum(["discord", "telegram", "slack"])).min(1, "At least one channel is required")
})