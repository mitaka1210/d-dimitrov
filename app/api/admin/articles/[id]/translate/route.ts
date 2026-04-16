import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "../../../../../../database/db";

const COOKIE_NAME = "token";

async function translateText(text: string, sourceLang: string, targetLang: string): Promise<string> {
    if (!text?.trim()) return text;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`MyMemory API error: ${res.status}`);
    const data = await res.json();
    return data?.responseData?.translatedText ?? text;
}

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

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    if (!verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const articleId = parseInt(id, 10);
    if (isNaN(articleId)) {
        return NextResponse.json({ error: "Invalid article id" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const sourceLang: string = body.sourceLang ?? "bg";
    const targetLang: string = body.targetLang ?? "en";

    // Fetch article and sections
    const articleResult = await pool.query(
        "SELECT id, title FROM articles WHERE id = $1",
        [articleId]
    );
    if (articleResult.rows.length === 0) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const sectionsResult = await pool.query(
        "SELECT id, title, content FROM sections WHERE article_id = $1 ORDER BY position",
        [articleId]
    );

    try {
        // Translate article title
        const translatedTitle = await translateText(articleResult.rows[0].title, sourceLang, targetLang);

        await pool.query(
            `INSERT INTO article_translations (article_id, language, title)
             VALUES ($1, $2, $3)
             ON CONFLICT (article_id, language) DO UPDATE SET title = EXCLUDED.title`,
            [articleId, targetLang, translatedTitle]
        );

        // Translate each section
        const translatedSections = [];
        for (const section of sectionsResult.rows) {
            const [sectionTitle, sectionContent] = await Promise.all([
                translateText(section.title, sourceLang, targetLang),
                translateText(section.content, sourceLang, targetLang),
            ]);

            await pool.query(
                `INSERT INTO section_translations (section_id, language, title, content)
                 VALUES ($1, $2, $3, $4)
                 ON CONFLICT (section_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content`,
                [section.id, targetLang, sectionTitle, sectionContent]
            );

            translatedSections.push({ id: section.id, title: sectionTitle, content: sectionContent });
        }

        return NextResponse.json({
            articleId,
            language: targetLang,
            title: translatedTitle,
            sections: translatedSections,
        });
    } catch (error: any) {
        console.error("Translation error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
