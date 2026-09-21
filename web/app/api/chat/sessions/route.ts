import { NextResponse } from 'next/server';
import { db } from '@/db';
import { chatSessions, chatMessages } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all sessions for this user
    const dbSessions = await db.select()
      .from(chatSessions)
      .where(eq(chatSessions.userId, session.userId))
      .orderBy(desc(chatSessions.createdAt));

    // Fetch all messages for these sessions
    const fullSessions = await Promise.all(dbSessions.map(async (sess) => {
      const msgs = await db.select()
        .from(chatMessages)
        .where(eq(chatMessages.sessionId, sess.id))
        .orderBy(chatMessages.createdAt);

      return {
        id: sess.id,
        title: sess.title,
        createdAt: sess.createdAt,
        messages: msgs.map(m => ({
          id: m.id,
          role: m.role as 'user' | 'assistant',
          content: m.content
        }))
      };
    }));

    return NextResponse.json(fullSessions);
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("Failed to fetch chat sessions:", err);
    return NextResponse.json({ error: 'Failed to fetch chat sessions' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, title, initialMessage, firstUserMessage } = body;

    if (!id || !title || !initialMessage || !firstUserMessage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert session
    await db.insert(chatSessions).values({
      id,
      userId: session.userId,
      title,
      createdAt: Date.now()
    });

    // Insert initial and first message
    await db.insert(chatMessages).values([
      {
        id: `init-${id}`, // Make unique per session to prevent constraint errors
        sessionId: id,
        role: initialMessage.role,
        content: initialMessage.content,
        createdAt: Date.now() - 10 // ensure order
      },
      {
        id: firstUserMessage.id,
        sessionId: id,
        role: firstUserMessage.role,
        content: firstUserMessage.content,
        createdAt: Date.now()
      }
    ]);

    return NextResponse.json({ message: 'Session created' });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("Failed to create chat session:", err);
    return NextResponse.json({ error: 'Failed to create chat session' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { sessionId, message } = body;

    if (!sessionId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert new message
    await db.insert(chatMessages).values({
      id: message.id,
      sessionId,
      role: message.role,
      content: message.content,
      createdAt: Date.now()
    });

    return NextResponse.json({ message: 'Message added' });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("Failed to add message:", err);
    return NextResponse.json({ error: 'Failed to add message' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getSession();
    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    // In PostgreSQL, foreign keys with onDelete: cascade handle cleanup automatically,
    // but deleting messages first ensures consistency.
    await db.delete(chatMessages).where(eq(chatMessages.sessionId, id));
    await db.delete(chatSessions).where(eq(chatSessions.id, id));

    return NextResponse.json({ message: 'Session deleted' });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("Failed to delete chat session:", err);
    return NextResponse.json({ error: 'Failed to delete chat session' }, { status: 500 });
  }
}
