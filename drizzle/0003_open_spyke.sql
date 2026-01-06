ALTER TABLE "event" DROP CONSTRAINT "event_eventCategoryId_eventCategory_id_fk";
--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_eventCategoryId_eventCategory_id_fk" FOREIGN KEY ("eventCategoryId") REFERENCES "public"."eventCategory"("id") ON DELETE cascade ON UPDATE no action;