import { z } from 'zod';

// Request schema
export const BaziChartRequestSchema = z.object({
  action: z.enum(['BAZI_CHART', 'MATCHMAKING', 'DAILY_LUCK', 'DAILY_ACTIVITIES', 'ASK_ANY', 'MONTHLY_CALENDAR', 'INSIGHT_CARD']).default('BAZI_CHART'),
  timezone: z.string(),
  user_a: z.object({
    nama: z.string(),
    birth_date: z.string(),
    birth_time: z.string(),
  }),
  user_b: z.object({
    nama: z.string().nullable(),
    birth_date: z.string().nullable(),
    birth_time: z.string().nullable(),
  }),
  current_date: z.string(),
  dynamic_question: z.string().nullable(),
});

export type BaziChartRequest = z.infer<typeof BaziChartRequestSchema>;

// Response schemas
const HeavenlyStemSchema = z.object({
  chinese: z.string(),
  element: z.string(),
  polarity: z.string(),
});

const EarthlyBranchSchema = z.object({
  chinese: z.string(),
  animal: z.string(),
  element: z.string(),
  polarity: z.string(),
});

const PillarSchema = z.object({
  heavenly_stem: HeavenlyStemSchema,
  earthly_branch: EarthlyBranchSchema,
});

export const BaziChartSchema = z.object({
  pillars: z.object({
    year: PillarSchema,
    month: PillarSchema,
    day: PillarSchema,
    hour: PillarSchema,
  }),
  day_master: z.object({
    stem: z.string(),
    element: z.string(),
    polarity: z.string(),
    strength: z.string(),
  }),
  element_balance: z.object({
    Wood: z.number(),
    Fire: z.number(),
    Earth: z.number(),
    Metal: z.number(),
    Water: z.number(),
  }),
  dominant_element: z.string().nullable(),
  lacking_element: z.string().nullable(),
  lucky_elements: z.array(z.string()).nullable(),
  unfavorable_elements: z.array(z.string()).nullable(),
  lucky_colors: z.array(z.string()).nullable(),
  lucky_numbers: z.array(z.number()).nullable(),
  lucky_directions: z.array(z.string()).nullable(),
  interpretation: z.object({
    personality: z.string().nullable(),
    strengths: z.array(z.string()).nullable(),
    weaknesses: z.array(z.string()).nullable(),
    life_theme: z.string().nullable(),
  }),
});

export const MonthlyCalendarSchema = z.array(z.object({
  date: z.string(),
  favorable: z.boolean(),
  reason: z.string(),
  what_to_do: z.string(),
  what_to_prevent: z.string()
}));

export const InsightCardSchema = z.object({
  category: z.string(),
  content: z.string()
});

export const BaziChartResponseSchema = z.object({
  action: z.enum(['BAZI_CHART', 'MATCHMAKING', 'DAILY_LUCK', 'DAILY_ACTIVITIES', 'ASK_ANY', 'MONTHLY_CALENDAR', 'INSIGHT_CARD']),
  status: z.enum(['SUCCESS', 'ERROR']),
  data_extraction: z.object({
    user_a: z.object({
      nama: z.string(),
      pilar_tahun_shio: z.string(),
      pilar_jam_shio: z.string(),
      elemen_dominan: z.string(),
    }),
    user_b: z.object({
      nama: z.string().nullable(),
      pilar_tahun_shio: z.string().nullable(),
      pilar_jam_shio: z.string().nullable(),
      elemen_dominan: z.string().nullable(),
    }),
    current_date_shio: z.string().nullable(),
  }),
  result: z.object({
    bazi_chart: BaziChartSchema.nullable().optional(),
    matchmaking: z.any().nullable().optional(),
    daily_luck: z.any().nullable().optional(),
    daily_activities: z.any().nullable().optional(),
    ask_any: z.any().nullable().optional(),
    monthly_calendar: MonthlyCalendarSchema.nullable().optional(),
    insight_card: InsightCardSchema.nullable().optional(),
  }),
  dynamic_question_answer: z.string().nullable(),
});

export const partnerFormSchema = z.object({
  partnerName: z.string().min(1, "Name is required"),
  partnerDob: z.string().min(1, "Birth date is required"),
  partnerTime: z.string().optional(),
});

export type PartnerFormValues = z.infer<typeof partnerFormSchema>;
export type BaziChartResponse = z.infer<typeof BaziChartResponseSchema>;
export type BaziChartData = z.infer<typeof BaziChartSchema>;
