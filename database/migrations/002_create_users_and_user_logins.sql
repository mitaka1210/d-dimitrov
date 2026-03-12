-- Users and user_logins for auth (PERN login migration)
-- Run: psql "$DATABASE_URL" -f database/migrations/002_create_users_and_user_logins.sql

CREATE TABLE IF NOT EXISTS users (
    id                SERIAL PRIMARY KEY,
    username          VARCHAR(255) NOT NULL UNIQUE,
    password          VARCHAR(255) NOT NULL,
    role              VARCHAR(50)  NOT NULL DEFAULT 'user',
    failed_attempts   INTEGER      NOT NULL DEFAULT 0,
    blocked           BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at        TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);

CREATE TABLE IF NOT EXISTS user_logins (
    id          SERIAL PRIMARY KEY,
    username    VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(50)  NOT NULL,
    login_time  TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_logins_username ON user_logins (username);
