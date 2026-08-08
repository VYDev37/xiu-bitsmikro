"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useArtifactsStore } from "@/stores/useArtifactsStore";
import { useUserStore } from "@/stores/useUserStore";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

export function ArtifactCalendar() {
  const {
    selectedDate,
    setSelectedDate,
    monthlyNotes,
    isLoadingMonthly,
    fetchMonthlyNotes
  } = useArtifactsStore();

  const { user } = useUserStore();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  useEffect(() => {
    if (user && user.name && user.birthDate && user.birthTime) {
      const monthYear = format(currentMonth, 'yyyy-MM');
      // Fetch if we don't already have some data for this month.
      // (A simple check to avoid overfetching. In a real app, you might track fetched months strictly).
      const hasData = Object.keys(monthlyNotes).some(k => k.startsWith(monthYear));

      if (!hasData) {
        const userPayload = {
          nama: user.name,
          birth_date: user.birthDate,
          birth_time: user.birthTime
        };
        fetchMonthlyNotes(userPayload, monthYear, "WIB");
      }
    }
  }, [currentMonth, user]);

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
  };

  // Convert monthlyNotes map into modifiers for react-day-picker
  const favorableDates: Date[] = [];
  const cautionDates: Date[] = [];

  Object.values(monthlyNotes).forEach(note => {
    const d = new Date(note.date);
    // adjust timezone issues roughly for visual check
    const localDate = new Date(d.getTime() + d.getTimezoneOffset() * 60000);

    if (note.favorable) {
      favorableDates.push(localDate);
    } else {
      cautionDates.push(localDate);
    }
  });

  return (
    <div className="p-4 md:p-6 border border-white/10 rounded-xl bg-gradient-to-br from-[#020617] to-slate-900 shadow-xl flex flex-col items-center relative overflow-hidden h-full">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {isLoadingMonthly && (
        <div className="absolute top-4 right-4 text-muted-foreground flex items-center text-xs">
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          Analyzing...
        </div>
      )}
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        month={currentMonth}
        onMonthChange={handleMonthChange}
        modifiers={{
          favorable: favorableDates,
          caution: cautionDates,
        }}
        modifiersStyles={{
          favorable: { border: '2px solid rgb(34 197 94)', fontWeight: 'bold' }, // green-500
          caution: { border: '2px solid rgb(239 68 68)', fontWeight: 'bold' }, // red-500
        }}
        classNames={{
          selected: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white font-bold border-none",
        }}
        className="rounded-md w-full flex justify-center z-10 bg-white/5 backdrop-blur-sm border border-white/5 p-2 shadow-inner"
      />
      <div className="w-full flex gap-4 justify-center mt-6 text-xs font-medium tracking-wide text-slate-400 z-10">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full border-2 border-green-500"></div>
          <span>Favorable</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full border-2 border-red-500"></div>
          <span>Caution</span>
        </div>
      </div>
    </div>
  );
}
