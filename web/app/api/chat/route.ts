import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = db.select().from(users).where(eq(users.id, session.userId)).get();
    if (!user || !user.birthDate || !user.birthTime) {
      return NextResponse.json({ error: 'Incomplete birth data. Please update your profile.' }, { status: 400 });
    }

    const body = await request.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const today = new Date().toISOString().split('T')[0];

    let systemPrompt = '';
    try {
      const promptPath = path.join(process.cwd(), '..', 'data', 'prompt.txt');
      systemPrompt = fs.readFileSync(promptPath, 'utf8');
    } catch (e) {
      console.warn("Could not load prompt.txt", e);
      return NextResponse.json({ error: 'System prompt configuration missing on server.' }, { status: 500 });
    }

    const ai = new GoogleGenAI({});

    // Format history if it exists to provide conversational context
    let contextStr = "";
    if (history && Array.isArray(history) && history.length > 0) {
      contextStr = "Previous Conversation:\n" + history.map((msg: { role: string; content: string }) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join("\n") + "\n\n";
    }

    const dynamicQuestion = `${contextStr}User's New Question: ${message}\n\n[SISTEM GUARDRAIL: Jika pertanyaan ini sama sekali tidak berhubungan dengan BaZi, Wuxing, Shio, Fengshui, atau Metafisika Tiongkok, TOLAK DENGAN SOPAN. Anda TIDAK BOLEH menjawab hal teknis, politik, resep, coding, dsb. Isi dynamic_question_answer dengan penolakan.]`;

    const payload = {
      action: "ASK_ANY",
      user_a: {
        nama: user.name,
        birth_date: user.birthDate,
        birth_time: user.birthTime
      },
      current_date: today,
      dynamic_question: dynamicQuestion
    };

    const userInput = `${JSON.stringify(payload, null, 2)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: userInput,
      config: {
        systemInstruction: `${systemPrompt}\n\nPlease respond strictly in valid JSON format according to the ASK_ANY action structure. Provide the response as a single JSON object without any Markdown formatting (no \`\`\`json blocks).`,
        responseMimeType: 'application/json',
      }
    });

    let resultText = response.text || "{}";

    // Robustly extract JSON object by finding the first '{' and last '}'
    const startIdx = resultText.indexOf('{');
    const endIdx = resultText.lastIndexOf('}');
    
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
      resultText = resultText.substring(startIdx, endIdx + 1);
    }

    const parsed = JSON.parse(resultText);

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error("Gemini API Error in Chat:", error);
    return NextResponse.json({ error: (error as Error).message || 'Failed to process chat request' }, { status: 500 });
  }
}
