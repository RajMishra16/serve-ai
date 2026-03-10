import { Pool } from "pg";

declare global {
  var pgPool: Pool | undefined;
}

const pool =
  global.pgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL!,
  });

if (process.env.NODE_ENV !== "production") {
  global.pgPool = pool;
}

export const db = pool;


// Create pantry_items table if it does not exist
async function createPantryTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS pantry_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        quantity TEXT NOT NULL,
        confidence FLOAT,
        added_via TEXT DEFAULT 'manual',
        user_id TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("pantry_items table ready");
  } catch (error) {
    console.error("Error creating pantry_items table", error);
  }
}

createPantryTable();