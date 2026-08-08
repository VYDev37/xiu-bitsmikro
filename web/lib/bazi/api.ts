import api from '@/lib/api';
import { BaziChartResponseSchema } from '@/schemas/bazi';
import type { BaziChartResponse } from '@/schemas/bazi';

export const fetchBaziChart = async (nama: string, birthDate: string, birthTime: string): Promise<BaziChartResponse> => {
  const today = new Date().toISOString().split('T')[0];
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const payload = {
    action: "BAZI_CHART",
    timezone,
    user_a: {
      nama: nama || "User",
      birth_date: birthDate,
      birth_time: birthTime,
    },
    current_date: today,
  };

  const { data } = await api.post('/bazi', payload);
  const parsed = BaziChartResponseSchema.safeParse(data);

  if (!parsed.success) {
    console.error("BaZi Zod Validation Error:", parsed.error);
    throw new Error('API response format is invalid or missing required fields.');
  }

  const result = parsed.data;

  if (result.status === 'ERROR') {
    throw new Error('API returned an error status while processing the BaZi chart.');
  }

  return result;
};
