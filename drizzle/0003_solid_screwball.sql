CREATE TYPE "public"."feature" AS ENUM('EVENTS', 'EVENTS_CATEGORIES');--> statement-breakpoint
CREATE TABLE "userCredits" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"featureKey" "feature" NOT NULL,
	"balance" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "userCredits" ADD CONSTRAINT "userCredits_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;