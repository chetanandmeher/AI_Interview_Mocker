// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// import * as schema from './schema';
// const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL);
// export const db = drizzle({ client: sql, schema: schema}, );
// 

import { Pool } from "pg";

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default db;

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };

