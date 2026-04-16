export const dynamic = "force-dynamic";
export const revalidate = 0; // Добави и това за всеки случай
import {NextRequest, NextResponse} from "next/server";
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
    main_image_url: string | null;
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const lang = searchParams.get("lang");

        let articlesQuery: string;
        let queryParams: string[];

        if (lang) {
            articlesQuery = `
                SELECT a.id                                   AS article_id,
                       COALESCE(at.title, a.title)            AS article_title,
                       a.created_at                           AS article_created_at,
                       a.main_image_url                       AS main_image_url,
                       a.status                               AS status,
                       s.id                                   AS section_id,
                       COALESCE(st.title, s.title)            AS section_title,
                       COALESCE(st.content, s.content)        AS section_content,
                       s.position                             AS section_position,
                       s.section_image_url                    AS section_image_url
                FROM articles a
                         LEFT JOIN article_translations at ON at.article_id = a.id AND at.language = $1
                         LEFT JOIN sections s ON a.id = s.article_id
                         LEFT JOIN section_translations st ON st.section_id = s.id AND st.language = $1
                ORDER BY a.id, s.position;
            `;
            queryParams = [lang];
        } else {
            articlesQuery = `
                SELECT a.id                AS article_id,
                       a.title             AS article_title,
                       a.created_at        AS article_created_at,
                       a.main_image_url    AS main_image_url,
                       a.status            AS status,
                       s.id                AS section_id,
                       s.title             AS section_title,
                       s.content           AS section_content,
                       s.position          AS section_position,
                       s.section_image_url AS section_image_url
                FROM articles a
                         LEFT JOIN sections s ON a.id = s.article_id
                ORDER BY a.id, s.position;
            `;
            queryParams = [];
        }

        const result = await pool.query(articlesQuery, queryParams);
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
                    images: row.main_image_url,
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
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
