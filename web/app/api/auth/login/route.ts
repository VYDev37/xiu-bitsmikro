import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { LoginSchema } from '@/schemas/user';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = await LoginSchema.safeParse(data);
    if (!parsed.data) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const { username, password } = parsed.data;

    const user = db.select().from(users).where(eq(users.username, username)).get();
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await argon2.verify(user.passwordHash, password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Setup iron-session
    const session = await getSession();
    session.userId = user.id;
    session.username = user.username;
    await session.save();

    return NextResponse.json({ 
      success: true, 
      user: { 
        id: user.id, 
        name: user.name, 
        username: user.username,
        birthDate: user.birthDate,
        birthTime: user.birthTime
      } 
    });
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
