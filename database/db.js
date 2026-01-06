// File: src/database/db.js
import pg from "pg";
const { Pool } = pg;

// -----------------------------
// CONFIG
// -----------------------------
const PRIMARY_DB = process.env.DATABASE_URL;
const FALLBACK_DB = process.env.NEON_DATABASE_URL;

const sslPrimary =
    process.env.NODE_ENV === "production" && process.env.DATABASE_SSL === "true"
        ? { rejectUnauthorized: false }
        : false;

const sslFallback = { rejectUnauthorized: false }; // Neon always requires SSL

// -----------------------------
// POOLS
// -----------------------------
const primaryPool = new Pool({
    connectionString: PRIMARY_DB,
    ssl: sslPrimary,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

const fallbackPool = FALLBACK_DB
    ? new Pool({
        connectionString: FALLBACK_DB,
        ssl: sslFallback,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
    })
    : null;

// -----------------------------
// STATE
// -----------------------------
let usingFallback = false;
let lastCheck = 0;
let consecutiveFailures = 0;

const HEALTH_CHECK_INTERVAL = 15000; // 15 sec
const MAX_FAILURES = 2;

// -----------------------------
// TELEGRAM ALERTS
// -----------------------------
async function sendTelegram(message) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) return;

    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "Markdown",
            }),
        });
    } catch (err) {
        console.error("Telegram send error:", err.message);
    }
}

// -----------------------------
// HEALTH CHECK
// -----------------------------
async function checkPrimary() {
    try {
        const client = await primaryPool.connect();
        await client.query("SELECT 1");
        client.release();
        return true;
    } catch {
        return false;
    }
}

async function periodicCheck() {
    const now = Date.now();
    if (now - lastCheck < HEALTH_CHECK_INTERVAL) return;

    lastCheck = now;

    const ok = await checkPrimary();

    if (!ok) {
        consecutiveFailures++;

        if (consecutiveFailures >= MAX_FAILURES && fallbackPool) {
            if (!usingFallback) {
                usingFallback = true;
                console.warn("⚠️ Switching to FALLBACK (NeonDB)");
                sendTelegram("🚨 *DATABASE FAILOVER*\n\nОсновната база е недостъпна.\nПревключихме към резервната база (NeonDB).");
            }
        }
    } else {
        if (usingFallback) {
            console.log("✅ Primary DB healthy again — switching back");
            usingFallback = false;
            consecutiveFailures = 0;

            sendTelegram("✅ *DATABASE RESTORED*\n\nВъзстановихме връзката с основната база.\nРаботим отново на PRIMARY.");
        } else {
            consecutiveFailures = 0;
        }
    }
}

// -----------------------------
// QUERY WRAPPER
// -----------------------------
async function query(sql, params) {
    await periodicCheck();

    const pool = usingFallback && fallbackPool ? fallbackPool : primaryPool;
    console.log(
        `[DB] Using ${usingFallback ? "FALLBACK" : "PRIMARY"} | Query: ${text.split("\n")[0].trim()}`
    );
    try {
        return await pool.query(sql, params);
    } catch (err) {
        console.error("Query error:", err.message);

        if (!usingFallback && fallbackPool) {
            usingFallback = true;
            console.warn("⚠️ Query failed — switching to fallback");
            sendTelegram("🚨 *DATABASE FAILOVER*\n\nОсновната база отказа заявка.\nПревключихме към резервната база (NeonDB).");

            return await fallbackPool.query(sql, params);
        }

        throw err;
    }
}

// -----------------------------
// PUBLIC API
// -----------------------------
function getConnectionStatus() {
    return {
        usingFallback,
        consecutiveFailures,
        primary: PRIMARY_DB?.substring(0, 40) + "...",
        fallback: FALLBACK_DB?.substring(0, 40) + "...",
        fallbackAvailable: !!fallbackPool,
    };
}

export default { query };
export { getConnectionStatus };