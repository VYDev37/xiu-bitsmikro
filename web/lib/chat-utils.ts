import { ChatResponseSchema } from '@/schemas/chat';

/**
 * Generates a title based on the user's first message.
 */
export function generateChatTitle(message: string): string {
  const cleanStr = message.trim();
  if (cleanStr.length === 0) return 'New Reading';
  return cleanStr.slice(0, 30) + (cleanStr.length > 30 ? '...' : '');
}

/**
 * Parses the raw API response and extracts the best text reply based on our fallback hierarchy.
 */
export function extractReplyFromResponse(rawData: unknown): string {
  // Validate data with Zod
  const result = ChatResponseSchema.safeParse(rawData);
  
  if (!result.success) {
    console.error("Zod Validation Error:", result.error);
    // If the error object has a message property, we might still want to surface it 
    // in case the API returned { error: "Something" } without action: ASK_ANY
    if (typeof rawData === 'object' && rawData !== null && 'error' in (rawData as Record<string, unknown>)) {
      return `Error: ${(rawData as Record<string, unknown>).error}`;
    }
    return "Maaf, respon dari server tidak dapat diproses (Invalid format).";
  }

  const data = result.data;
  
  if (data.error) {
    return `System Error: ${data.error}`;
  }
  if (data.message) {
    return data.message;
  }

  let reply = "Maaf, saya tidak dapat merumuskan jawaban saat ini.";

  if (data.dynamic_question_answer) {
    reply = data.dynamic_question_answer;
  } else if (data.result?.ask_any?.direct_answer) {
    reply = data.result.ask_any.direct_answer;
  } else if (data.result?.ask_any?.personal_analysis) {
    reply = data.result.ask_any.personal_analysis;
  }

  return reply;
}
