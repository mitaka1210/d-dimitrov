// File: src/database/db.js
import pg from "pg";
const { Pool } = pg;

// Primary database configuration
let primaryConnectionString = process.env.DATABASE_URL;
console.log("pesho 1",primaryConnectionString);
console.log("pesho 1",process.env.DATABASE_URL);

switch (primaryConnectionString) {
    case "development":
        primaryConnectionString = process.env.DATABASE_URL || process.env.DATABASE_URL;
        console.log("pesho 2 DEV",);
        break;
    case "production":
    default:
        primaryConnectionString = process.env.DATABASE_URL || process.env.DATABASE_URL;
        console.log("pesho 3 PROD",);
        break;
}

// Fallback (Neon DB) configuration
const fallbackConnectionString = process.env.NEON_DATABASE_URL;

const ssl =
    process.env.NODE_ENV === "production" && process.env.DATABASE_SSL === "true"
        ? { rejectUnauthorized: false }
        : false;

// Tracking state
let usingFallback = false;
let lastHealthCheck = 0;
let consecutiveFailures = 0;
const HEALTH_CHECK_INTERVAL = 30000; // 30 seconds
const MAX_FAILURES_BEFORE_FALLBACK = 2;
const FALLBACK_RECHECK_INTERVAL = 60000; // 1 minute

// Primary pool
const primaryPool = new Pool({
    connectionString: primaryConnectionString,
    ssl,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

// Fallback pool (Neon DB)
let fallbackPool = null;
if (fallbackConnectionString) {
    fallbackPool = new Pool({
        connectionString: fallbackConnectionString,
        ssl: { rejectUnauthorized: false }, // Neon requires SSL
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
    });
}

// Get active pool
function getActivePool() {
    return usingFallback && fallbackPool ? fallbackPool : primaryPool;
}

// Health check for primary database
async function checkPrimaryHealth() {
    try {
        const client = await primaryPool.connect();
        await client.query("SELECT 1");
        client.release();
        return true;
    } catch (err) {
        console.error("Primary DB health check failed:", err.message);
        return false;
    }
}

// Switch to fallback database
function switchToFallback() {
    if (!fallbackPool) {
        console.error("❌ No fallback database configured!");
        return false;
    }

    if (!usingFallback) {
        console.warn("⚠️  Switching to FALLBACK database (Neon DB)");
        usingFallback = true;

        // Send Telegram notification (if configured)
        sendTelegramAlert("🚨 *DATABASE FAILOVER!*\n\nПревключихме към резервната база (Neon DB)\n\n⚠️ Основната база не отговаря!");
    }
    return true;
}

// Switch back to primary database
async function switchToPrimary() {
    if (usingFallback) {
        console.log("✅ Switching back to PRIMARY database");
        usingFallback = false;
        consecutiveFailures = 0;

        // Send Telegram notification
        sendTelegramAlert("✅ *DATABASE RESTORED!*\n\nВъзстановихме връзката с основната база данни.");
    }
}

// Send Telegram alert
async function sendTelegramAlert(message) {
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
        console.error("Failed to send Telegram alert:", err);
    }
}

// Periodic health check
async function periodicHealthCheck() {
    const now = Date.now();

    // Skip if checked recently
    if (now - lastHealthCheck < HEALTH_CHECK_INTERVAL) {
        return;
    }

    lastHealthCheck = now;

    const isHealthy = await checkPrimaryHealth();

    if (!isHealthy) {
        consecutiveFailures++;
        console.warn(`Primary DB failed health check (${consecutiveFailures}/${MAX_FAILURES_BEFORE_FALLBACK})`);

        if (consecutiveFailures >= MAX_FAILURES_BEFORE_FALLBACK) {
            switchToFallback();
        }
    } else {
        // Primary is healthy
        if (usingFallback) {
            // Try to switch back to primary
            console.log("Primary DB is healthy again, switching back...");
            await switchToPrimary();
        } else {
            // Reset failure counter
            consecutiveFailures = 0;
        }
    }
}

// Enhanced connection with automatic failover
async function ensureConnected(retries = 3, delayMs = 1000) {
    // Run periodic health check
    periodicHealthCheck().catch(console.error);

    const pool = getActivePool();

    try {
        const client = await pool.connect();
        client.release();
        return;
    } catch (err) {
        console.error(`DB connect failed (${usingFallback ? 'FALLBACK' : 'PRIMARY'}):`, err.message);

        // If primary failed, try fallback
        if (!usingFallback && fallbackPool) {
            console.warn("Attempting failover to Neon DB...");
            switchToFallback();

            // Try fallback connection
            try {
                const fbClient = await fallbackPool.connect();
                fbClient.release();
                return;
            } catch (fbErr) {
                console.error("Fallback DB also failed:", fbErr.message);
            }
        }

        // Retry logic
        if (retries <= 0) throw err;
        console.warn(`Retrying connection, retries left=${retries}`);
        await new Promise((r) => setTimeout(r, delayMs));
        return ensureConnected(retries - 1, delayMs * 2);
    }
}

// Query wrapper with automatic failover
async function query(text, params) {
    // Run health check periodically
    periodicHealthCheck().catch(console.error);

    const pool = getActivePool();

    try {
        return await pool.query(text, params);
    } catch (err) {
        console.error(`Query failed on ${usingFallback ? 'FALLBACK' : 'PRIMARY'} DB:`, err.message);

        // If primary failed, try fallback
        if (!usingFallback && fallbackPool) {
            console.warn("Query failed, attempting failover...");
            switchToFallback();

            try {
                return await fallbackPool.query(text, params);
            } catch (fbErr) {
                console.error("Query also failed on fallback DB:", fbErr.message);
                throw fbErr;
            }
        }

        throw err;
    }
}

// Get connection status
function getConnectionStatus() {
    return {
        usingFallback,
        consecutiveFailures,
        primaryConnection: primaryConnectionString?.substring(0, 30) + "...",
        fallbackConnection: fallbackConnectionString?.substring(0, 30) + "...",
        fallbackAvailable: !!fallbackPool,
    };
}

console.log("ENV FILE TEST:", process.env.NEXT_PUBLIC_ENV);
console.log("Primary DB:", primaryConnectionString?.substring(0, 50) + "...");
console.log("Fallback DB configured:", !!fallbackConnectionString);

// Export both pool and query
const pool = {
    query,
    connect: () => getActivePool().connect(),
    end: () => Promise.all([primaryPool.end(), fallbackPool?.end()].filter(Boolean)),
};

export default pool;
export { ensureConnected, getConnectionStatus };