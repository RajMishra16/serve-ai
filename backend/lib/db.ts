import mysql from "mysql2/promise";

declare global {
  // allow global `mysqlPool`
  var mysqlPool: mysql.Pool | undefined;
}

const pool =
  global.mysqlPool ||
  mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "serveai",
    waitForConnections: true,
    connectionLimit: 10,
  });

if (process.env.NODE_ENV !== "production") {
  global.mysqlPool = pool;
}

export const db = pool;

// Create pantry_items table if it does not exist
async function createPantryTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS pantry_items (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        confidence FLOAT,
        added_via VARCHAR(50) DEFAULT 'manual',
        user_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("pantry_items table ready");
  } catch (error) {
    console.error("Error creating pantry_items table", error);
  }
}

createPantryTable();