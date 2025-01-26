/** @type { import("drizzle-kit").Config} */
export default {
    schema: "./utils/schema.js",
    out: "./drizzle",
    dialect: 'postgresql',
    dbCredentials: {
        url: "postgresql://neondb_owner:npg_VCf7Tet3Psyh@ep-red-hall-a8lk2r8b-pooler.eastus2.azure.neon.tech/ai-interview-mocker-new?sslmode=require"
    }
};