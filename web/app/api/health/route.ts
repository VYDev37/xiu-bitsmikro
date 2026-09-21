import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const start = Date.now();
    await db.execute(sql`SELECT 1 as ping`);
    const latencyMs = Date.now() - start;

    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      latencyMs,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        status: 'error',
        database: 'unreachable',
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
