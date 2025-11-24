import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Взема URL от .env
});

export async function POST(req:any) {
    try {
        const { name, email } = await req.json();
        console.log('Received data:', { name, email });

        if (!name || !email) {
            return NextResponse.json({ success: false, error: 'Missing name or email' }, { status: 400 });
        }

        const loginDate = new Date().toISOString();

        await pool.query('INSERT INTO logins (name, email, login_date) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET login_date = EXCLUDED.login_date',
            [name, email, loginDate]);

        return NextResponse.json({ success: true, message: 'User login recorded' });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
    }
}
