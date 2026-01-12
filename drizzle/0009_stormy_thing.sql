ALTER TABLE "eventCategory" ALTER COLUMN "channel" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "eventCategory" ALTER COLUMN "channel" SET DATA TYPE "public"."discord"[] USING "channel"::text::"public"."discord"[];--> statement-breakpoint
ALTER TABLE "eventCategory" ALTER COLUMN "channel" SET DEFAULT '{"discord"}';