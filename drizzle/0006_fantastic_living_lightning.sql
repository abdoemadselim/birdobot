CREATE TYPE "public"."discord" AS ENUM('discord', 'telegram', 'slack');--> statement-breakpoint
ALTER TABLE "eventCategory" ADD COLUMN "channel" "discord" DEFAULT 'discord';