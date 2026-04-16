-- Article and section translations tables
-- Run: psql "$DATABASE_URL" -f database/migrations/003_create_article_translations.sql

CREATE TABLE IF NOT EXISTS article_translations (
    id         SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    language   VARCHAR(10) NOT NULL,
    title      TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(article_id, language)
);

CREATE INDEX IF NOT EXISTS idx_article_translations_article_lang
    ON article_translations (article_id, language);

CREATE TABLE IF NOT EXISTS section_translations (
    id         SERIAL PRIMARY KEY,
    section_id INTEGER NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    language   VARCHAR(10) NOT NULL,
    title      TEXT NOT NULL,
    content    TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(section_id, language)
);

CREATE INDEX IF NOT EXISTS idx_section_translations_section_lang
    ON section_translations (section_id, language);
