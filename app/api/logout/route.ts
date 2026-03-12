import { NextResponse } from 'next/server';

const COOKIE_NAME = 'token';
const isProduction = process.env.NODE_ENV === 'production';

export async function POST() {
  const cookieValue =
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0` +
    (isProduction ? '; Secure' : '');

  const response = NextResponse.json({ ok: true });
  response.headers.set('Set-Cookie', cookieValue);
  return response;
}
