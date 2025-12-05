import pool  from "../../../../../database/db"; // Файлът db.js съдържа връзката с PostgreSQL
import {NextRequest, NextResponse} from "next/server"; // Файлът db.js съдържа връзката с PostgreSQL

// export default async function handler(req:any, res:any) {
//     const { id } = req.query;
//
//     if (req.method === "GET") {
//         try {
//             const likes = await pool.query(
//                 "SELECT COUNT(*) FROM article_likes WHERE article_id = $1 AND is_like = true",
//                 [id]
//             );
//             const dislikes = await pool.query(
//                 "SELECT COUNT(*) FROM article_likes WHERE article_id = $1 AND is_like = false",
//                 [id]
//             );
//
//             res.json({
//                 likes: parseInt(likes.rows[0].count, 10),
//                 dislikes: parseInt(dislikes.rows[0].count, 10),
//             });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: "Server error" });
//         }
//     } else {
//         res.status(405).json({ error: "Method not allowed" });
//     }
// }



export async function GET(req, context) {
    // 🔹 params е Promise → трябва да го await-нем
    const { id } = await context.params;
    console.log("🟡 Article ID:", id);

    try {
        const result = await pool.query(
            `SELECT
                 COUNT(*) FILTER (WHERE type = 'like') AS likes,
                 COUNT(*) FILTER (WHERE type = 'dislike') AS dislikes
             FROM article_likes_dislikes
             WHERE article_id = $1`,
            [id]
        );

        const data = result.rows[0] || { likes: 0, dislikes: 0 };
        return NextResponse.json(data);
    } catch (error) {
        console.error("🔴 Database error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

