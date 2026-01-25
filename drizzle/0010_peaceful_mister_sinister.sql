CREATE TYPE "public"."paymentStatus" AS ENUM('PENDING', 'COMPLETED', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "payment" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"status" "paymentStatus" DEFAULT 'PENDING',
	"transactionId" varchar(100),
	"total" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;