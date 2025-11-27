import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",        // NEW (recommended)
  schema: "./db/schema",        // folder with schema files
  out: "./drizzle",             // migrations folder
  dbCredentials: {
    url: process.env.DATABASE_URL!,   // for PostgreSQL
  },
});
