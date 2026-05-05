// File: src/database/db.js
import pg from 'pg';

const { Pool } = pg;

// -----------------------------
// CONFIG
// -----------------------------
const PRIMARY_DB = process.env.DATABASE_URL;
const FALLBACK_DB = process.env.NEON_DATABASE_URL;

const sslPrimary = process.env.NODE_ENV === 'production' && process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false;

const sslFallback = { rejectUnauthorized: false }; // Neon always requires SSL

// -----------------------------
// POOLS
// -----------------------------
let primaryPool;
let fallbackPool;
if (process.env.NODE_ENV === 'production') {
 // В production създаваме нормални нови пулове
 primaryPool = new Pool({
  connectionString: PRIMARY_DB,
  ssl: sslPrimary,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
 });

 fallbackPool = FALLBACK_DB
  ? new Pool({
     connectionString: FALLBACK_DB,
     ssl: sslFallback,
     max: 10,
     idleTimeoutMillis: 30000,
     connectionTimeoutMillis: 5000,
    })
  : null;
} else {
 // В development използваме глобалния обект, за да не трупаме връзки
 if (!global._primaryPool) {
  global._primaryPool = new Pool({
   connectionString: PRIMARY_DB,
   ssl: sslPrimary,
   max: 10,
   idleTimeoutMillis: 30000,
   connectionTimeoutMillis: 5000,
  });
 }
 primaryPool = global._primaryPool;

 if (FALLBACK_DB && !global._fallbackPool) {
  global._fallbackPool = new Pool({
   connectionString: FALLBACK_DB,
   ssl: sslFallback,
   max: 10,
   idleTimeoutMillis: 30000,
   connectionTimeoutMillis: 5000,
  });
 }
 fallbackPool = global._fallbackPool || null;
}
// -----------------------------
// STATE
// -----------------------------
const state =
 process.env.NODE_ENV === 'production'
  ? { usingFallback: false, lastCheck: 0, consecutiveFailures: 0 }
  : (global._dbState ??= { usingFallback: false, lastCheck: 0, consecutiveFailures: 0 });

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
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({
    chat_id: chatId,
    text: message,
    parse_mode: 'Markdown',
   }),
  });
 } catch (err) {
  console.error('Telegram send error:', err.message);
 }
}

// -----------------------------
// HEALTH CHECK
// -----------------------------
async function checkPrimary() {
 try {
  const client = await primaryPool.connect();
  await client.query('SELECT 1');
  client.release();
  return true;
 } catch {
  return false;
 }
}

async function periodicCheck() {
 const now = Date.now();
 if (now - state.lastCheck < HEALTH_CHECK_INTERVAL) return;

 state.lastCheck = now;

 const ok = await checkPrimary();

 if (!ok) {
  state.consecutiveFailures++;

  if (state.consecutiveFailures >= MAX_FAILURES && fallbackPool) {
   if (!state.usingFallback) {
    state.usingFallback = true;
    console.warn('⚠️ Switching to FALLBACK (NeonDB)');
    await sendTelegram('🚨 *DATABASE FAILOVER*\n\nОсновната база е' + ' недостъпна.\nПревключихме към резервната база (NeonDB).');
   }
  }
 } else {
  if (state.usingFallback) {
   console.log('✅ Primary DB healthy again — switching back');
   state.usingFallback = false;
   state.consecutiveFailures = 0;

   await sendTelegram('✅ *DATABASE RESTORED*\n\nВъзстановихме' + ' връзката с основната база.\nРаботим отново на PRIMARY.');
  } else {
   state.consecutiveFailures = 0;
  }
 }
}

// -----------------------------
// QUERY WRAPPER
// -----------------------------
// Списък с кодове за грешки, които индикират проблем със сървъра, а не със SQL-а
const CONNECTION_ERROR_CODES = [
 'ECONNREFUSED',
 'ETIMEDOUT',
 '57P01', // admin_shutdown
 '57P02', // crash_shutdown
 '57P03', // cannot_connect_now
 '08000', // connection_exception
 '08003', // connection_does_not_exist
 '08006', // connection_failure
];

async function query(sql, params) {
 await periodicCheck();
 const pool = state.usingFallback && fallbackPool ? fallbackPool : primaryPool;

 try {
  return await pool.query(sql, params);
 } catch (err) {
  const isConnectionError = CONNECTION_ERROR_CODES.includes(err.code) || err.message.toLowerCase().includes('connect');

  if (!state.usingFallback && fallbackPool && isConnectionError) {
   state.usingFallback = true;
   console.warn('⚠️ Connection failed — switching to fallback');
   await sendTelegram('🚨 *DATABASE FAILOVER*...');
   return await fallbackPool.query(sql, params);
  }

  if (!isConnectionError) {
   console.error('❌ SQL Logic Error (Not a connection issue):', err.message);
  }

  throw err;
 }
}

// -----------------------------
// PUBLIC API
// -----------------------------
function getConnectionStatus() {
 return {
  usingFallback: state.usingFallback,
  consecutiveFailures: state.consecutiveFailures,
  primary: PRIMARY_DB?.substring(0, 40) + '...',
  fallback: FALLBACK_DB?.substring(0, 40) + '...',
  fallbackAvailable: !!fallbackPool,
 };
}

export default { query };
export { getConnectionStatus };
