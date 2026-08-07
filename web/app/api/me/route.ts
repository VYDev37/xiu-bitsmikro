import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session.userId) {
    session.destroy();
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = db.select().from(users).where(eq(users.id, session.userId)).get();
  if (!user) {
    session.destroy();
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
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
