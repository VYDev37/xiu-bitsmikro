import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { db } from '@/db';
import { monthlyCalendar } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_a, monthYear, timezone } = body;

    if (!user_a?.birth_date || !user_a?.birth_time || !monthYear) {
      return NextResponse.json({ error: 'Birth date, time, and monthYear are required' }, { status: 400 });
    }

    // Check DB cache first
    const cached = db.select()
      .from(monthlyCalendar)
      .where(and(
        eq(monthlyCalendar.nama, user_a.nama || "User"),
        eq(monthlyCalendar.birthDate, user_a.birth_date),
        eq(monthlyCalendar.birthTime, user_a.birth_time),
        eq(monthlyCalendar.monthYear, monthYear)
      ))
      .get();

    if (cached) {
      try {
        const parsedData = JSON.parse(cached.data);
        return NextResponse.json(parsedData);
      } catch (e) {
        console.warn("Found cached monthly calendar but failed to parse JSON. Regenerating...");
      }
    }

    // Retry helper
    async function fetchWithRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
      let lastError: Error;
      for (let i = 0; i < maxRetries; i++) {
        try {
          return await fn();
        } catch (error: unknown) {
          lastError = error instanceof Error ? error : new Error(String(error));
          console.warn(`Attempt ${i + 1} failed: ${lastError.message}`);
          if (i < maxRetries - 1) {
            const delay = Math.pow(2, i) * 1000;
            await new Promise(res => setTimeout(res, delay));
          }
        }
      }
      throw lastError!;
    }

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
      action: "MONTHLY_CALENDAR",
      timezone: timezone || "WIB",
      user_a: {
        nama: user_a.nama || "User",
        birth_date: user_a.birth_date,
        birth_time: user_a.birth_time
      },
      user_b: {
        nama: null,
        birth_date: null,
        birth_time: null
      },
      current_date: `${monthYear}-15`, // Send the middle of the month to evaluate the entire month
      dynamic_question: null
    };

    const userInput = `${JSON.stringify(payload, null, 2)}`;

    const parsed = await fetchWithRetry(async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: userInput,
        config: {
          systemInstruction: `${systemPrompt}\n\nPlease respond strictly in valid JSON format matching the BAZI_CHART response schema. Provide the response as a single JSON object without any Markdown formatting (no \`\`\`json blocks).`,
          responseMimeType: 'application/json',
          temperature: 0.1,
          maxOutputTokens: 8192,
        }
      });

      let responseText = response.text || "{}";
      responseText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();

      const startIdx = responseText.indexOf('{');
      const endIdx = responseText.lastIndexOf('}');
      if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        responseText = responseText.substring(startIdx, endIdx + 1);
      }

      const parsedData = JSON.parse(responseText);
      
      // Save to database
      try {
        db.insert(monthlyCalendar).values({
          nama: user_a.nama || "User",
          birthDate: user_a.birth_date,
          birthTime: user_a.birth_time,
          monthYear: monthYear,
          data: JSON.stringify(parsedData)
        }).run();
      } catch (dbErr) {
        console.error("Failed to cache monthly calendar in database:", dbErr);
      }

      return parsedData;
    }, 3);

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("Gemini API Error after retries:", err);
    return NextResponse.json({ error: err.message || 'Failed to generate monthly calendar' }, { status: 500 });
  }
}
