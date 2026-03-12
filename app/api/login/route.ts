import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../../database/db';
import { getErrorMessages, translate } from '../../lib/authErrorMessages';

const COOKIE_NAME = 'token';
const COOKIE_MAX_AGE = 60 * 60; // 1 hour

export async function POST(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get('lang') || 'bg';
  const messages = await getErrorMessages();

  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || typeof username !== 'string' || !username.trim()) {
      return NextResponse.json(
        { message: translate(messages, 'username_required', locale) },
        { status: 400 }
      );
    }
    if (!password || typeof password !== 'string' || !password.trim()) {
      return NextResponse.json(
        { message: translate(messages, 'password_required', locale) },
        { status: 400 }
      );
    }

    const trimmedUsername = username.trim();

    let role = body.role;
    if (trimmedUsername === 'fena00721') {
      role = 'super_admin';
    }

    const userResult = await db.query(
      'SELECT * FROM users WHERE username = $1',
      [trimmedUsername]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { message: translate(messages, 'invalid_credentials', locale) },
        { status: 401 }
      );
    }

    const user = userResult.rows[0];

    if (user.blocked) {
      return NextResponse.json(
        {
          message:
            translate(messages, 'max_attempts', locale) + ' dimitard185@gmail.com',
        },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const failedAttempts = (user.failed_attempts || 0) + 1;
      await db.query(
        'UPDATE users SET failed_attempts = $1, blocked = $2 WHERE username = $3',
        [failedAttempts, failedAttempts >= 5, trimmedUsername]
      );

      if (failedAttempts >= 5) {
        return NextResponse.json(
          {
            message:
              translate(messages, 'max_attempts', locale) +
              ' dimitard185@gmail.com',
          },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { message: translate(messages, 'invalid_credentials', locale) },
        { status: 401 }
      );
    }

    await db.query(
      'UPDATE users SET failed_attempts = 0 WHERE username = $1',
      [trimmedUsername]
    );

    const SECRET_KEY = process.env.SECRET_KEY;
    if (!SECRET_KEY) {
      console.error('SECRET_KEY is not set');
      return NextResponse.json(
        { message: translate(messages, 'internal_error', locale) },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    await db.query(
      `INSERT INTO user_logins (username, password, role, login_time)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`,
      [user.username, user.password, user.role]
    );

    const isProduction = process.env.NODE_ENV === 'production';
    const cookieValue =
      `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${COOKIE_MAX_AGE}` +
      (isProduction ? '; Secure' : '');

    const response = NextResponse.json({
      role: user.role,
      username: user.username,
    });
    response.headers.set('Set-Cookie', cookieValue);

    return response;
  } catch (err) {
    console.error('Error during login:', err);
    return NextResponse.json(
      { message: translate(messages, 'internal_error', locale) },
      { status: 500 }
    );
  }
}
