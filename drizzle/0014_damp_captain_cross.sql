ALTER TABLE "eventCategory" DROP CONSTRAINT "eventCategory_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "event" DROP CONSTRAINT "event_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "userCredits" DROP CONSTRAINT "userCredits_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "eventCategory" ADD CONSTRAINT "eventCategory_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userCredits" ADD CONSTRAINT "userCredits_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;