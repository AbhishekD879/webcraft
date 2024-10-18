import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error(`Connection String Not Passed ${connectionString}`);


console.log(connectionString)

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/schema.ts",
  dbCredentials: {
   url:process.env.DATABASE_URL!
  },
});
