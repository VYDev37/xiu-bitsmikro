import { z } from 'zod';

export const ChatResponseSchema = z.object({
  action: z.literal('ASK_ANY'),
  result: z.object({
    ask_any: z.object({
      direct_answer: z.string().optional(),
      personal_analysis: z.string().optional(),
    }).optional()
  }).optional(),
  dynamic_question_answer: z.string().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
});

export type ChatResponse = z.infer<typeof ChatResponseSchema>;
