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
    const dbSessions = db.select()
      .from(chatSessions)
      .where(eq(chatSessions.userId, session.userId))
      .orderBy(desc(chatSessions.createdAt))
      .all();

    // Fetch all messages for these sessions
    // To keep it simple and fast, we can fetch all messages for the user by joining or just iterating
    // Since it's SQLite, running a query for each session is fine, but fetching all user messages is better.
    // For now, let's just fetch messages session by session
    const fullSessions = dbSessions.map(sess => {
      const msgs = db.select()
        .from(chatMessages)
        .where(eq(chatMessages.sessionId, sess.id))
        .orderBy(chatMessages.createdAt)
        .all();

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
    });

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
    db.insert(chatSessions).values({
      id,
      userId: session.userId,
      title,
      createdAt: Date.now()
    }).run();

    // Insert initial and first message
    db.insert(chatMessages).values([
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
    ]).run();

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
    db.insert(chatMessages).values({
      id: message.id,
      sessionId,
      role: message.role,
      content: message.content,
      createdAt: Date.now()
    }).run();

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

    // SQLite with Drizzle cascade delete will handle messages
    // Wait, better-sqlite3 with drizzle PRAGMA foreign_keys = ON might be needed.
    // If not, let's manually delete messages first just in case
    db.delete(chatMessages).where(eq(chatMessages.sessionId, id)).run();
    db.delete(chatSessions).where(eq(chatSessions.id, id)).run();

    return NextResponse.json({ message: 'Session deleted' });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("Failed to delete chat session:", err);
    return NextResponse.json({ error: 'Failed to delete chat session' }, { status: 500 });
  }
}
