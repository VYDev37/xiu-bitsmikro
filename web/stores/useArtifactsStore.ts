import { create } from 'zustand';
import { MonthlyCalendarSchema } from '@/schemas/bazi';
import api from '@/lib/api';

export interface CalendarNote {
  date: string;
  favorable: boolean;
  reason: string;
  what_to_do: string;
  what_to_prevent: string;
}

export interface SavedNote extends CalendarNote {
  id: number;
}

interface ArtifactsState {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;

  monthlyNotes: Record<string, CalendarNote>;
  isLoadingMonthly: boolean;
  fetchMonthlyNotes: (user_a: { nama: string; birth_date: string; birth_time: string }, monthYear: string, timezone: string) => Promise<void>;

  savedNotes: Record<string, SavedNote>;
  isLoadingSaved: boolean;
  fetchSavedNotes: (nama: string, birthDate: string) => Promise<void>;
  saveNote: (nama: string, birthDate: string, note: CalendarNote) => Promise<void>;
  deleteNote: (nama: string, birthDate: string, id: number, dateStr: string) => Promise<void>;
}

export const useArtifactsStore = create<ArtifactsState>((set, get) => ({
  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),

  monthlyNotes: {},
  isLoadingMonthly: false,
  fetchMonthlyNotes: async (user_a, monthYear, timezone) => {
    set({ isLoadingMonthly: true });
    try {
      const res = await api.post('/artifacts/calendar', { user_a, monthYear, timezone });
      const json = res.data;
      // Zod validation
      const dataToParse = json.result?.monthly_calendar || json.monthly_calendar || (Array.isArray(json) ? json : []);
      const parsed = MonthlyCalendarSchema.safeParse(dataToParse);
      if (parsed.success) {
        const notesArray = parsed.data;
        const notesMap: Record<string, CalendarNote> = {};
        notesArray.forEach((note) => {
          notesMap[note.date] = note;
        });

        set((state) => ({
          monthlyNotes: { ...state.monthlyNotes, ...notesMap }
        }));
      } else {
        console.error("Monthly calendar validation failed:", parsed.error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      set({ isLoadingMonthly: false });
    }
  },

  savedNotes: {},
  isLoadingSaved: false,
  fetchSavedNotes: async (nama, birthDate) => {
    set({ isLoadingSaved: true });
    try {
      const res = await api.get(`/artifacts/saved?nama=${encodeURIComponent(nama)}&birthDate=${encodeURIComponent(birthDate)}`);
      const data = res.data as { id: number; data: string | CalendarNote; date: string }[];
      const savedMap: Record<string, SavedNote> = {};
      data.forEach((item) => {
        let parsedData = item.data;
        if (typeof parsedData === 'string') {
          try { parsedData = JSON.parse(parsedData); } catch (e) { }
        }
        savedMap[item.date] = { id: item.id, ...(parsedData as CalendarNote) };
      });
      set({ savedNotes: savedMap });
    } catch (e) {
      console.error(e);
    } finally {
      set({ isLoadingSaved: false });
    }
  },

  saveNote: async (nama, birthDate, note) => {
    try {
      const res = await api.post('/artifacts/saved', {
        nama,
        birthDate,
        date: note.date,
        data: note
      });
      const { id } = res.data;
      set((state) => ({
        savedNotes: {
          ...state.savedNotes,
          [note.date]: { ...note, id }
        }
      }));
    } catch (e) {
      console.error(e);
    }
  },

  deleteNote: async (nama, birthDate, id, dateStr) => {
    try {
      await api.delete(`/api/artifacts/saved?id=${id}`);
      set((state) => {
        const newSaved = { ...state.savedNotes };
        delete newSaved[dateStr];
        return { savedNotes: newSaved };
      });
    } catch (e) {
      console.error(e);
    }
  }
}));
