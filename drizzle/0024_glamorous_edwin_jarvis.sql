ALTER TYPE "public"."discord" ADD VALUE 'email';--> statement-breakpoint
ALTER TABLE "eventCategory" ADD COLUMN "emailAddress" varchar(255);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "emailAddress" varchar(255);