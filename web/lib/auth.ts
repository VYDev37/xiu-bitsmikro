import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  userId?: number;
  username?: string;
}

export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'bazi-auth-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  return session;
}
