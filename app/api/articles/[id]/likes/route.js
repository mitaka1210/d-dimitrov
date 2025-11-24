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

export async function GET(req, {params}) {
    const { id } = await params; // Await the context to get params
    try {
        const response = await fetch(`https://share.d-dimitrov.eu/api/get/all-like-dislike/${id}`);

        if (!response.ok) {
            throw new Error('Failed to fetch articles');
        }
        const articles = await response.json();
        console.log("pesho", articles);
        // Return the fetched articles as JSON
        return NextResponse.json(articles);
    } catch (error) {
        console.error("🔴 Database error:", error);
        return new NextResponse(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}

