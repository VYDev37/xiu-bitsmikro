'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const refreshProfile = useUserStore((state) => state.refreshProfile);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      refreshProfile();
    }
  }, [isAuthenticated, refreshProfile]);

  return children;
}
