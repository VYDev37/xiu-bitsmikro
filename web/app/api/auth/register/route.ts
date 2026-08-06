import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, username, password, birthDate, birthTime } = await request.json();

    if (!name || !username || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existing = db.select().from(users).where(eq(users.username, username)).get();
    if (existing) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const result = db.insert(users).values({
      name,
      username,
      passwordHash,
      birthDate: birthDate || null,
      birthTime: birthTime || null,
    }).returning().get();

    // Setup iron-session
    const session = await getSession();
    session.userId = result.id;
    session.username = result.username;
    await session.save();

    return NextResponse.json({ success: true, user: { id: result.id, name: result.name, username: result.username } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
