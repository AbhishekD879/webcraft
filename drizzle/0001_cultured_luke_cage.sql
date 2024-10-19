CREATE TABLE IF NOT EXISTS "siteState" (
	"siteId" uuid,
	"state" text,
	"savedJsonState" text,
	"jsonState" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"timestamp" timestamp DEFAULT now()
);
