ALTER TABLE "siteState" RENAME COLUMN "jsonState" TO "publishedJsonState";--> statement-breakpoint
ALTER TABLE "siteState" DROP COLUMN IF EXISTS "state";