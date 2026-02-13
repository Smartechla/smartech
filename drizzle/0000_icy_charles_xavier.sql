CREATE TABLE "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"client" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reportsClient" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"status" varchar,
	"clientId" integer
);
--> statement-breakpoint
ALTER TABLE "reportsClient" ADD CONSTRAINT "reportsClient_clientId_clients_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;