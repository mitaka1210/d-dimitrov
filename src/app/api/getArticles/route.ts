import { NextResponse } from "next/server";
import pool, { ensureConnected } from "@/database/db";

export async function GET() {
 try {
  await ensureConnected();

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

  const articlesMap: Record<number, any> = {};
  for (const row of result.rows) {
   const articleId = Number(row.article_id);
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

   if (row.section_id != null) {
    articlesMap[articleId].sections.push({
     id: row.section_id,
     position: row.section_position,
     title: row.section_title,
     content: row.section_content,
     image_url: row.section_image_url,
    });
   }
  }

  const articles = Object.values(articlesMap);
  return NextResponse.json(articles);
 } catch (error: any) {
  console.error("Database error:", error);
  const message = error?.message || String(error);
  return NextResponse.json({ error: message }, { status: 500 });
 }
}
