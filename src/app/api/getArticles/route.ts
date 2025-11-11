import { NextResponse } from "next/server";
import pool, { ensureConnected } from "@/database/db";

export async function GET() {
 console.log("Connecting to DB:", process.env.DATABASE_URL);
 try {
  await ensureConnected(); // will throw if cannot connect
  const result = await pool.query("SELECT * FROM articles ORDER BY created_at DESC");
  return NextResponse.json(result.rows);
 } catch (error: any) {
  console.error("Database error:", error);
  const message = error?.message || String(error);
  return NextResponse.json({ error: message }, { status: 500 });
 }
}