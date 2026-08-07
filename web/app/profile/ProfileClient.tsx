'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import ProfileForm from '@/components/forms/ProfileForm';

export default function ProfileClient() {
  const user = useUserStore(state => state.user);
  const isLoading = useUserStore(state => state.isLoading);
  const refreshProfile = useUserStore(state => state.refreshProfile);

  useEffect(() => {
    // If we have no user, attempt to fetch it via API
    if (!user && !isLoading) {
      refreshProfile();
    }
  }, [user, isLoading, refreshProfile]);

  // Optionally show a loading state
  if (isLoading) {
    return <div className="text-center p-4 text-slate-400 animate-pulse">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-center p-4 text-rose-400">Please log in to view your profile.</div>;
  }

  const userData = {
    id: user.id,
    name: user.name,
    username: user.username,
    birthDate: user.birthDate,
    birthTime: user.birthTime
  };

  return <ProfileForm initialUser={userData} />;
}
