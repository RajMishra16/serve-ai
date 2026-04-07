import mysql from "mysql2/promise";

declare global {
  var mysqlPool: mysql.Pool | undefined;
}

const pool =
  global.mysqlPool ||
  mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

if (process.env.NODE_ENV !== "production") {
  global.mysqlPool = pool;
}

export const db = pool;

// ✅ Create ALL required tables
async function initializeDatabase() {
  try {
    // Pantry Table
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

    // Recipe History Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS recipe_history (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(255),
        title VARCHAR(255),
        image TEXT,
        ingredients JSON,
        missing_ingredients JSON,
        steps JSON,
        cook_time INT,
        difficulty VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        generation_id VARCHAR(36)
      )
    `);

    // Recipe Library Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS recipe_library (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255),
        image TEXT,
        country VARCHAR(100),
        type VARCHAR(100),
        diet VARCHAR(50),
        ingredients JSON,
        steps JSON,
        cook_time INT,
        difficulty VARCHAR(50)
      )
    `);

    console.log("✅ All tables ready");
  } catch (error) {
    console.error("❌ Database initialization error:", error);
  }
}

initializeDatabase();