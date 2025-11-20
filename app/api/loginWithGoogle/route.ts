import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../database/db';

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return new NextResponse(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
    }

    const { username, email } = await req.json();

    if (!username || !email) {
        return new NextResponse(JSON.stringify({ message: 'Username and password are required' }), { status: 400 });
    }

    try {
        const userResult = await pool.query('SELECT id, name, email FROM googlelogin WHERE name = $1', [username]);

        if (userResult.rows.length === 0) {
            return new NextResponse(JSON.stringify({ message: 'Invalid username or password' }), { status: 401 });
        }
        const user = userResult.rows[0];
        await pool.query('INSERT INTO googlelogin (name, email, login_date) VALUES ($1, $2, CURRENT_TIMESTAMP)', [
            user.name,
            user.email,
        ]);

        return new NextResponse(JSON.stringify({ user: { id: user.id, name: user.name, email: user.email } }), { status: 200 });
    } catch (err) {
        console.error('Error during login:', err);
        return new NextResponse(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}