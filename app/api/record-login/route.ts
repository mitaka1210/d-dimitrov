import { NextResponse } from 'next/server';
import db from '../../../database/db';

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing name or email' },
        { status: 400 }
      );
    }

    const loginDate = new Date().toISOString();

    await db.query(
      `INSERT INTO logins (name, email, login_date) VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET login_date = EXCLUDED.login_date`,
      [name, email, loginDate]
    );

    return NextResponse.json({ success: true, message: 'User login recorded' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Database error' },
      { status: 500 }
    );
  }
}
