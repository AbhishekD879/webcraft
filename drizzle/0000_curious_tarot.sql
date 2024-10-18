CREATE TABLE IF NOT EXISTS "sites" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" text,
	"name" text,
	"url" text,
	"subdomain" text
);
