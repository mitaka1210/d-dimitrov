import pool  from "../../../../../database/db";
import {NextRequest, NextResponse} from "next/server"; // Файлът db.js съдържа връзката с PostgreSQL


// TODO when add user login need this post request for connect user_id and article_id in article_likes table
//TODO когато добавя и логина да мога да обвържа статията с логнатия потребител и харесванията и не харестанията

// export default async function handler(req:any, res:any) {
//     const { id } = req.query;
//     const { user_id, is_like } = req.body;
//
//     if (req.method === "POST") {
//         try {
//             // Проверяваме дали user вече е гласувал
//             const existing = await pool.query(
//                 "SELECT * FROM article_likes WHERE article_id = $1 AND user_id = $2",
//                 [id, user_id]
//             );
//
//             if (existing.rows.length > 0) {
//                 // Update на съществуващия запис
//                 await pool.query(
//                     "UPDATE article_likes SET is_like = $1 WHERE article_id = $2 AND user_id = $3",
//                     [is_like, id, user_id]
//                 );
//             } else {
//                 // Добавяне на нов запис
//                 await pool.query(
//                     "INSERT INTO article_likes (article_id, user_id, is_like) VALUES ($1, $2, $3)",
//                     [id, user_id, is_like]
//                 );
//             }
//
//             res.json({ success: true });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: "Server error" });
//         }
//     } else {
//         res.status(405).json({ error: "Method not allowed" });
//     }
// }
/**
 * Handles the HTTP request for liking or disliking an article.
 *
 * @param {NextRequest} req - The HTTP request object.
 * @param {NextResponse} res - The HTTP response object.
 *
 * The request should contain:
 * - `id` in the query parameters, representing the article ID.
 * - `isLike` in the request body, a boolean indicating whether the action is a like (true) or dislike (false).
 *
 * The function updates the `likes` or `dislikes` count of the specified article in the database.
 * It responds with a JSON object indicating success or an error message.
 */


export async function POST(req,context) {
    const { params } = context; // Правилно извличаме `params`
    try {
        const { id } = await params; // ✅ ID от URL параметрите
        console.log("🔹 ID from params:", id);

        // ✅ Четем тялото на заявката
        const { type } = await req.json();
        console.log("🔹 Type:", type);

        // ✅ Проверка за валидност на заявката
        if (!id || (type !== "like" && type !== "dislike")) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        // ✅ Изпращаме заявка към външния API
        const response = await fetch(`https://share.d-dimitrov.eu/api/post/like-dislike/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                article_id: id,
                type,
            }),
        });

        const data = await response.json();

        // ✅ Връщаме отговора от външния API
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("🔴 Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}


