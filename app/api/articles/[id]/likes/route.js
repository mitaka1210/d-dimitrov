export const dynamic = "force-dynamic";

import pool from "../../../../../database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, context) {
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