import { useState } from 'react';
import type { BaziChartResponse } from '@/schemas/bazi';
import { fetchBaziChart } from '@/lib/bazi/api';

interface UseBaziCalculatorProps {
  onSuccess?: (data: BaziChartResponse) => void;
  onError?: (error: string) => void;
}

export function useBaziCalculator({ onSuccess, onError }: UseBaziCalculatorProps = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BaziChartResponse | null>(null);

  const calculateBazi = async (nama: string, birthDate: string, birthTime: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // 1. Fetch from API (caching is now handled on the server)
      const result = await fetchBaziChart(nama, birthDate, birthTime);

      // 2. Update state
      setData(result);
      
      if (onSuccess) onSuccess(result);
      
      return result;
    } catch (err: any) {
      console.error('Bazi Calculation Error:', err);
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      if (onError) onError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
  };

  return {
    calculateBazi,
    loading,
    error,
    data,
    reset,
  };
}
