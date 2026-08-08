"use client";

import { useArtifactsStore } from '@/stores/useArtifactsStore';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';

export function NotesPanel() {
  const {
    selectedDate,
    monthlyNotes,
    savedNotes,
    saveNote,
    deleteNote
  } = useArtifactsStore();

  const { user } = useUserStore();

  if (!selectedDate) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-slate-400 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md shadow-xl text-center">
        <p>Select a date on the calendar to view its energies.</p>
      </div>
    );
  }

  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  const note = monthlyNotes[dateStr];
  const savedNote = savedNotes[dateStr];

  const activeNote = note || savedNote;

  const handleToggleSave = () => {
    if (!user || !user.name || !user.birthDate) return;
    
    if (savedNote) {
      deleteNote(user.name, user.birthDate, savedNote.id, dateStr);
    } else if (note) {
      saveNote(user.name, user.birthDate, note);
    }
  };

  if (!activeNote) {
    return (
      <div className="h-full flex flex-col p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md shadow-xl">
        <h3 className="font-bold font-serif text-2xl text-white mb-2">{format(selectedDate, 'MMMM d, yyyy')}</h3>
        <p className="text-slate-400 text-sm">No special energies highlighted for this date.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-6 border border-white/10 rounded-xl bg-gradient-to-br from-slate-900 to-[#020617] shadow-xl relative overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-start mb-6 pb-4 border-b border-white/10 shrink-0">
        <div>
          <h3 className="font-bold font-serif text-2xl text-white mb-1">{format(selectedDate, 'MMMM d, yyyy')}</h3>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mt-2 shadow-sm ${
            activeNote.favorable 
            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
            : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
            {activeNote.favorable ? 'Favorable' : 'Caution'}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleSave}
          title={savedNote ? "Remove bookmark" : "Save this date"}
          className="hover:bg-white/10 transition-colors"
        >
          {savedNote ? <BookmarkCheck className="h-5 w-5 text-blue-400" /> : <Bookmark className="h-5 w-5 text-slate-400" />}
        </Button>
      </div>

      <div className="space-y-6 text-sm flex-1">
        <div>
          <h4 className="font-semibold tracking-wide text-slate-300 uppercase text-xs mb-2 flex items-center gap-2">
            Energy Analysis
          </h4>
          <p className="text-slate-200 leading-relaxed text-base">{activeNote.reason}</p>
        </div>

        <div className="bg-green-500/5 p-4 rounded-lg border border-green-500/10 shadow-inner">
          <h4 className="font-medium text-green-400 mb-2 flex items-center gap-2">
            <span className="text-green-500 text-lg">✓</span> Recommended
          </h4>
          <p className="text-slate-300 leading-relaxed">{activeNote.what_to_do}</p>
        </div>

        <div className="bg-red-500/5 p-4 rounded-lg border border-red-500/10 shadow-inner">
          <h4 className="font-medium text-red-400 mb-2 flex items-center gap-2">
            <span className="text-red-500 text-lg">✗</span> Avoid
          </h4>
          <p className="text-slate-300 leading-relaxed">{activeNote.what_to_prevent}</p>
        </div>
      </div>
    </div>
  );
}
