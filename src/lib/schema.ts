import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const sites = pgTable("sites",{
    id: uuid().primaryKey(),
    userId: text("userId"),
    name: text("name"),
    url: text("url"),
    subdomain:text("subdomain"),
})