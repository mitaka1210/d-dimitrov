import pool  from "../../../database/db";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        console.log("🟡 Received email:", email);

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // ✅ Записваме директно в базата
        await pool.query(
            "INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING",
            [email]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("🔴 Database error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}