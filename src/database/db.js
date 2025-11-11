// File: src/database/db.js
import pg from "pg";
const { Pool } = pg;

let connectionString = process.env.DATABASE_URL;

// choose connection string by environment
switch (process.env.NEXT_PUBLIC_ENV) {
    case "stage":
        connectionString = process.env.STAGE_DATABASE_URL || process.env.DATABASE_URL;
        break;
    case "development":
        connectionString = process.env.DEV_DATABASE_URL || process.env.DATABASE_URL;
        break;
    case "production":
    default:
        connectionString = process.env.PROD_DATABASE_URL || process.env.DATABASE_URL;
        break;
}

const ssl =
    process.env.NODE_ENV === "production" && process.env.DATABASE_SSL === "true"
        ? { rejectUnauthorized: false }
        : false;

const pool = new Pool({
    connectionString,
    ssl,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

// try to connect with retries to give DB time to come up (useful in dev/docker)
async function ensureConnected(retries = 3, delayMs = 1000) {
    try {
        const client = await pool.connect();
        client.release();
        return;
    } catch (err) {
        if (retries <= 0) throw err;
        console.warn(`DB connect failed, retries left=${retries} — ${err?.message || err}`);
        await new Promise((r) => setTimeout(r, delayMs));
        return ensureConnected(retries - 1, delayMs * 2);
    }
}

console.log("ENV FILE TEST:", process.env.NEXT_PUBLIC_ENV);
console.log("DB URL:", process.env.DATABASE_URL);

export default pool;
// Compare this snippet from server/index.js:
export { ensureConnected };