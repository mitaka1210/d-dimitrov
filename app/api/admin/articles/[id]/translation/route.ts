import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "../../../../../../database/db";

const COOKIE_NAME = "token";

function verifyAdmin(req: NextRequest): boolean {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) return false;
    const SECRET_KEY = process.env.SECRET_KEY;
    if (!SECRET_KEY) return false;
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { role?: string };
        return decoded.role === "admin";
    } catch {
        return false;
    }
}

interface SectionTranslation {
    id: number;
    title: string;
    content: string;
}

// GET — returns existing translations for an article
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    if (!verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const articleId = parseInt(id, 10);
    if (isNaN(articleId)) {
        return NextResponse.json({ error: "Invalid article id" }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang");
    if (!lang) {
        return NextResponse.json({ error: "lang param required" }, { status: 400 });
    }

    const [articleTrans, sectionTrans] = await Promise.all([
        pool.query(
            "SELECT title FROM article_translations WHERE article_id = $1 AND language = $2",
            [articleId, lang]
        ),
        pool.query(
            `SELECT st.section_id AS id, st.title, st.content
             FROM section_translations st
             JOIN sections s ON s.id = st.section_id
             WHERE s.article_id = $1 AND st.language = $2
             ORDER BY s.position`,
            [articleId, lang]
        ),
    ]);

    return NextResponse.json({
        articleId,
        language: lang,
        title: articleTrans.rows[0]?.title ?? null,
        sections: sectionTrans.rows,
    });
}

// PUT — upsert translations (manual save from admin)
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    if (!verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const articleId = parseInt(id, 10);
    if (isNaN(articleId)) {
        return NextResponse.json({ error: "Invalid article id" }, { status: 400 });
    }

    const body = await req.json().catch(() => null);
    if (!body?.lang || !body?.title) {
        return NextResponse.json({ error: "lang and title are required" }, { status: 400 });
    }

    const { lang, title, sections = [] }: { lang: string; title: string; sections: SectionTranslation[] } = body;

    await pool.query(
        `INSERT INTO article_translations (article_id, language, title)
         VALUES ($1, $2, $3)
         ON CONFLICT (article_id, language) DO UPDATE SET title = EXCLUDED.title`,
        [articleId, lang, title]
    );

    for (const section of sections) {
        if (!section.id) continue;
        await pool.query(
            `INSERT INTO section_translations (section_id, language, title, content)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (section_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content`,
            [section.id, lang, section.title ?? "", section.content ?? ""]
        );
    }

    return NextResponse.json({ ok: true });
}
