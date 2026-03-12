import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const COOKIE_NAME = 'token';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const SECRET_KEY = process.env.SECRET_KEY;
    if (!SECRET_KEY) {
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, SECRET_KEY) as {
      id: number;
      username: string;
      role?: string;
      iat?: number;
      exp?: number;
    };

    return NextResponse.json({
      role: decoded.role ?? 'user',
      username: decoded.username,
    });
  } catch {
    return NextResponse.json(
      { message: 'Authorization failed' },
      { status: 401 }
    );
  }
}
