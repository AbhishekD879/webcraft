import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const sites = pgTable("sites", {
    id: uuid().primaryKey(),
    userId: text("userId"),
    name: text("name"),
    url: text("url"),
    subdomain: text("subdomain").unique(), // Add unique constraint
});

export const siteStateTable = pgTable("siteState", {
    siteId: uuid("siteId"), // Assuming siteId is a UUID
    savedJsonState: text("savedJsonState"), // Specify the field name for savedJsonState
    PublishedJsonState: text("publishedJsonState"),
    createdAt: timestamp("createdAt").defaultNow(), // Automatically set to current timestamp on creation
    updatedAt: timestamp("updatedAt").defaultNow(), // Automatically set to current timestamp on update
    timestamp: timestamp("timestamp").defaultNow(), // Automatically set to current timestamp
});
