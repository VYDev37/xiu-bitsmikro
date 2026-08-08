import { NextResponse } from 'next/server';
import { db } from '@/db';
import { savedDates } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const nama = searchParams.get('nama');
    const birthDate = searchParams.get('birthDate');

    if (!nama || !birthDate) {
      return NextResponse.json({ error: 'nama and birthDate are required' }, { status: 400 });
    }

    const saved = db.select()
      .from(savedDates)
      .where(and(
        eq(savedDates.nama, nama),
        eq(savedDates.birthDate, birthDate)
      ))
      .all();

    return NextResponse.json(saved);
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("Failed to fetch saved dates:", err);
    return NextResponse.json({ error: 'Failed to fetch saved dates' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, birthDate, date, data } = body;

    if (!nama || !birthDate || !date || !data) {
      return NextResponse.json({ error: 'nama, birthDate, date, and data are required' }, { status: 400 });
    }

    // Check if already saved
    const existing = db.select()
      .from(savedDates)
      .where(and(
        eq(savedDates.nama, nama),
        eq(savedDates.birthDate, birthDate),
        eq(savedDates.date, date)
      ))
      .get();

    if (existing) {
      return NextResponse.json({ message: 'Date already saved', id: existing.id });
    }

    const result = db.insert(savedDates).values({
      nama,
      birthDate,
      date,
      data: typeof data === 'string' ? data : JSON.stringify(data)
    }).returning().get();

    return NextResponse.json({ message: 'Date saved successfully', id: result.id });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("Failed to save date:", err);
    return NextResponse.json({ error: 'Failed to save date' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    db.delete(savedDates).where(eq(savedDates.id, parseInt(id))).run();

    return NextResponse.json({ message: 'Saved date deleted successfully' });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("Failed to delete saved date:", err);
    return NextResponse.json({ error: 'Failed to delete saved date' }, { status: 500 });
  }
}
