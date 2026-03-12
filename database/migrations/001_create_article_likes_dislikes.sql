-- Article likes/dislikes table
-- Run: psql "$DATABASE_URL" -f database/migrations/001_create_article_likes_dislikes.sql

CREATE TABLE IF NOT EXISTS article_likes_dislikes (
    id          SERIAL PRIMARY KEY,
    article_id  INTEGER NOT NULL,
    user_id     INTEGER NULL,
    type        VARCHAR(20) NULL CHECK (type IN ('like', 'dislike')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_article_likes_dislikes_article_id
    ON article_likes_dislikes (article_id);
