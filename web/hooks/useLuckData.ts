import { useState, useEffect } from 'react';
import api from '@/lib/api';

import type { LuckData } from '@/schemas/luck';

export function useLuckData() {
  const [luck, setLuck] = useState<LuckData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLuck = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get<LuckData>('/luck');
      setLuck(data);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred while fetching your reading.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLuck();
  }, []);

  return { luck, loading, error, refetch: fetchLuck };
}
