export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import pool from "../../../database/db";

interface ArticleRow {
    article_id: number;
    article_title: string;
    article_created_at: string;
    status: boolean;
    section_id: number | null;
    section_title: string | null;
    section_content: string | null;
    section_position: number | null;
    section_image_url: string | null;
}

export async function GET() {
    try {
        const articlesQuery = `
            SELECT
                a.id         AS article_id,
                a.title      AS article_title,
                a.created_at AS article_created_at,
                a.status     AS status,
                s.id         AS section_id,
                s.title      AS section_title,
                s.content    AS section_content,
                s.position   AS section_position,
                s.image_url  AS section_image_url
            FROM articles a
                     LEFT JOIN sections s ON a.id = s.article_id
            ORDER BY a.id, s.position;
        `;

        const result = await pool.query(articlesQuery);
        const rows = result.rows as unknown as ArticleRow[];

        const articlesMap: Record<number, any> = {};

        for (const row of rows) {
            const articleId = row.article_id;

            if (!articlesMap[articleId]) {
                articlesMap[articleId] = {
                    id: articleId,
                    title: row.article_title,
                    status: row.status,
                    createData: row.article_created_at,
                    images: row.section_image_url,
                    sections: [],
                };
            }

            if (row.section_id !== null) {
                articlesMap[articleId].sections.push({
                    id: row.section_id,
                    position: row.section_position,
                    title: row.section_title,
                    content: row.section_content,
                    image_url: row.section_image_url,
                });
            }
        }

        return NextResponse.json(Object.values(articlesMap));

    } catch (error: any) {
        console.error("Database error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}