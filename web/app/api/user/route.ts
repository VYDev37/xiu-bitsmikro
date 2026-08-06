import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = db.select().from(users).where(eq(users.id, session.userId)).get();
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ 
    user: { 
      id: user.id, 
      name: user.name, 
      username: user.username,
      birthDate: user.birthDate,
      birthTime: user.birthTime
    } 
  });
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, birthDate, birthTime } = await request.json();
    
    const updated = db.update(users).set({
      name,
      birthDate: birthDate || null,
      birthTime: birthTime || null
    }).where(eq(users.id, session.userId)).returning().get();

    return NextResponse.json({ success: true, user: {
      id: updated.id,
      name: updated.name,
      username: updated.username,
      birthDate: updated.birthDate,
      birthTime: updated.birthTime
    }});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
