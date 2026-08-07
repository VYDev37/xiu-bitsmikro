import { z } from 'zod';

export const LuckDataSchema = z.object({
  action: z.string().optional(),
  status: z.string().optional(),
  data_extraction: z.object({
    user_a: z.object({
      nama: z.string().optional(),
      pilar_tahun_shio: z.string().optional(),
      pilar_jam_shio: z.string().optional(),
      elemen_dominan: z.string().optional(),
    }).optional(),
    current_date_shio: z.string().optional(),
  }).optional(),
  result: z.object({
    daily_luck: z.object({
      status: z.string().optional(),
      luck_score: z.union([z.number(), z.string()]).optional(),
      primary_warning: z.string().optional(),
      physics_logic: z.string().optional(),
    }).optional(),
  }).optional(),
});

export type LuckData = z.infer<typeof LuckDataSchema>;
