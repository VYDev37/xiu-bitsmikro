import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users, dailyLuck } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = db.select().from(users).where(eq(users.id, session.userId)).get();
  if (!user || !user.birthDate || !user.birthTime) {
    return NextResponse.json({ error: 'Incomplete birth data. Please update your profile.' }, { status: 400 });
  }

  const today = new Date().toISOString().split('T')[0];

  // Check cache
  const cached = db.select()
    .from(dailyLuck)
    .where(and(eq(dailyLuck.userId, user.id), eq(dailyLuck.date, today)))
    .get();

  if (cached) {
    try {
      return NextResponse.json(JSON.parse(cached.reading));
    } catch {
      // If parsing fails, just fall through to generate a new one
    }
  }

  // 1. Retry helper from backend-patterns
  async function fetchWithRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
    let lastError: Error;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error: any) {
        lastError = error;
        console.warn(`Attempt ${i + 1} failed: ${error.message}`);
        if (i < maxRetries - 1) {
          const delay = Math.pow(2, i) * 1000;
          await new Promise(res => setTimeout(res, delay));
        }
      }
    }
    throw lastError!;
  }

  try {
    let systemPrompt = '';
    try {
      const promptPath = path.join(process.cwd(), '..', 'data', 'prompt.txt');
      systemPrompt = fs.readFileSync(promptPath, 'utf8');
    } catch (e) {
      console.warn("Could not load prompt.txt", e);
      return NextResponse.json({ error: 'System prompt configuration missing on server.' }, { status: 500 });
    }

    const ai = new GoogleGenAI({});
    const payload = {
      action: "DAILY_LUCK",
      user_a: {
        nama: user.name,
        birth_date: user.birthDate,
        birth_time: user.birthTime
      },
      current_date: today
    };

    const userInput = `${JSON.stringify(payload, null, 2)}`;

    // 2. Fetch with Retry for LLM instability
    const parsed = await fetchWithRetry(async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: userInput,
        config: {
          systemInstruction: `${systemPrompt}\n\nPlease respond strictly in valid JSON format. Provide the response as a single JSON object without any Markdown formatting (no \`\`\`json blocks).`,
          responseMimeType: 'application/json',
          temperature: 0.3, // Lower temperature to reduce hallucinated syntax errors
        }
      });

      let readingText = response.text || "{}";

      // 3. Strip potential markdown blocks explicitly if they sneaked in
      readingText = readingText.replace(/```json/gi, '').replace(/```/g, '').trim();

      // Robustly extract JSON object by finding the first '{' and last '}'
      const startIdx = readingText.indexOf('{');
      const endIdx = readingText.lastIndexOf('}');
      
      if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        readingText = readingText.substring(startIdx, endIdx + 1);
      }

      // Attempt to parse, will throw if invalid (triggering retry)
      return JSON.parse(readingText);
    }, 3);

    // Save to cache
    db.insert(dailyLuck).values({
      userId: user.id,
      date: today,
      reading: JSON.stringify(parsed)
    }).run();

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Gemini API Error after retries:", error);
    return NextResponse.json({ error: error.message || 'Failed to generate reading after retries' }, { status: 500 });
  }
}
