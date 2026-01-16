CREATE TYPE "public"."discord" AS ENUM('discord', 'telegram', 'slack');--> statement-breakpoint
CREATE TYPE "public"."deliveryStatusEnum" AS ENUM('PENDING', 'FAILED', 'DELIVERED');--> statement-breakpoint
CREATE TYPE "public"."plan" AS ENUM('FREE', 'PRO');--> statement-breakpoint
CREATE TABLE "eventCategory" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"name" varchar(100) NOT NULL,
	"emoji" varchar(32),
	"color" integer NOT NULL,
	"channels" "discord"[] DEFAULT '{"discord"}' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "event_name_user_id" UNIQUE("name","userId")
);
--> statement-breakpoint
CREATE TABLE "event" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"name" varchar(255),
	"formattedMessage" text,
	"fields" jsonb,
	"eventCategoryId" integer,
	"deliveryStatus" "deliveryStatusEnum" DEFAULT 'PENDING',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quota" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"count" integer DEFAULT 0 NOT NULL,
	"month" integer,
	"year" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"externalId" text,
	"email" varchar(255) NOT NULL,
	"discordId" varchar(255),
	"telegramId" integer,
	"apiKey" uuid DEFAULT gen_random_uuid(),
	"plan" "plan" DEFAULT 'FREE',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"quotaLimit" integer,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "eventCategory" ADD CONSTRAINT "eventCategory_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_eventCategoryId_eventCategory_id_fk" FOREIGN KEY ("eventCategoryId") REFERENCES "public"."eventCategory"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quota" ADD CONSTRAINT "quota_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "createdAt_idx" ON "event" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "fields_idx" ON "event" USING btree ("fields");--> statement-breakpoint
CREATE INDEX "apiKey_idx" ON "user" USING btree ("apiKey");--> statement-breakpoint
CREATE INDEX "email_idx" ON "user" USING btree ("email");