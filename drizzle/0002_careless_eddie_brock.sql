ALTER TABLE "event" ALTER COLUMN "fields" SET DATA TYPE jsonb;--> statement-breakpoint
CREATE INDEX "fields_idx" ON "event" USING btree ("fields");