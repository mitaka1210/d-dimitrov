/*
import pg from "pg";

const {Pool} = pg;
const pool = new Pool({
  user: "mitaka",
  password: "mitaka",
  host: "192.168.55.5",
  port: 5434,
  database: "dev_db"
});

export default pool;
// Compare this snippet from server/index.js:
*/

import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;

// Load environment-specific .env file
const env = process.env.NODE_ENV || 'development';
dotenv.config({
  path: env === "production" ? ".env.production" : ".env.development"
});

// Log configuration based on environment
console.log(`Running in ${env} mode`);
if (env === 'development') {
  console.log("Database Configuration:", {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });
}

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export default pool;
