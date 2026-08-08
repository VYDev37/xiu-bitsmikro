"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useArtifactsStore } from "@/stores/useArtifactsStore";
import { ArtifactCalendar } from "@/components/features/artifacts/ArtifactCalendar";
import { NotesPanel } from "@/components/features/artifacts/NotesPanel";
import { ProfileRequiredAlert } from "@/components/features/artifacts/ProfileRequiredAlert";
import { DeepLifeInsights } from "@/components/features/artifacts/DeepLifeInsights";

// Custom hook for side-effects (fetching data)
function useArtifactsInit() {
  const { user } = useUserStore();
  const { fetchSavedNotes } = useArtifactsStore();

  useEffect(() => {
    if (user?.name && user?.birthDate) {
      fetchSavedNotes(user.name, user.birthDate);
    }
  }, [user, fetchSavedNotes]);

  return { user };
}

export function ArtifactsClient() {
  const { user } = useArtifactsInit();

  if (!user || !user.birthDate || !user.birthTime) {
    return <ProfileRequiredAlert />;
  }

  return (
    <div className="container max-w-6xl py-8 mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Artifacts Dashboard</h1>
        <p className="text-muted-foreground">Deep analysis and life trajectory insights based on your BaZi profile.</p>
      </div>

      {/* Top Section: Calendar & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[450px]">
        <div className="h-full flex flex-col">
          <h2 className="text-xl font-semibold mb-3">Energy Calendar</h2>
          <ArtifactCalendar />
        </div>
        <div className="h-full flex flex-col">
          <h2 className="text-xl font-semibold mb-3">Selected Date Insight</h2>
          <NotesPanel />
        </div>
      </div>

      <DeepLifeInsights />
    </div>
  );
}
