import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getIronSession } from 'iron-session';
import { sessionOptions, type SessionData } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(request, res, sessionOptions);
  const isValidSession = !!session.userId;
  const { pathname } = request.nextUrl;

  // Untuk non-guest (logged in) dengan session yang valid, allow semua
  if (isValidSession) {
    if (pathname === '/login' || pathname === '/register') {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
    return res;
  }

  // Untuk guest (atau invalid token), allow /, /login, /register, dan /api/auth/*
  const isGuestAllowed =
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname.startsWith('/api/auth/');

  if (!isValidSession && !isGuestAllowed) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
