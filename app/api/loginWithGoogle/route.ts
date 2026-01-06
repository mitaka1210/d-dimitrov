import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../database/db';

interface GoogleUser {
    id: number;
    name: string;
    email: string;
}

export async function POST(req: NextRequest) {
    const { username, email } = await req.json();

    if (!username || !email) {
        return NextResponse.json({ message: 'Username and email are required' }, { status: 400 });
    }

    try {
        const userResult = await pool.query(
            'SELECT id, name, email FROM googlelogin WHERE name = $1',
            [username]
        );

        const rows = userResult.rows as unknown as GoogleUser[];

        if (rows.length === 0) {
            return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
        }

        const user = rows[0];

        await pool.query(
            'INSERT INTO googlelogin (name, email, login_date) VALUES ($1, $2, CURRENT_TIMESTAMP)',
            [user.name, user.email]
        );

        return NextResponse.json(
            { user: { id: user.id, name: user.name, email: user.email } },
            { status: 200 }
        );

    } catch (err) {
        console.error('Error during login:', err);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}