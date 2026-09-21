import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { RegisterSchema } from '@/schemas/user';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = await RegisterSchema.safeParse(data);
    if (!parsed.data) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { name, username, password, birthDate, birthTime } = parsed.data;

    const [existing] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    if (existing) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 1
    });

    const [result] = await db.insert(users).values({
      name,
      username,
      passwordHash,
      birthDate: birthDate || null,
      birthTime: birthTime || null,
    }).returning();

    // Setup iron-session
    const session = await getSession();
    session.userId = result.id;
    session.username = result.username;
    await session.save();

    return NextResponse.json({ 
      success: true, 
      user: { 
        id: result.id, 
        name: result.name, 
        username: result.username,
        birthDate: result.birthDate,
        birthTime: result.birthTime
      } 
    });
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
