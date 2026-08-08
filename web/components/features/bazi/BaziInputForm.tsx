'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

interface BaziInputFormProps {
  onSubmit: (nama: string, birthDate: string, birthTime: string) => void;
  loading: boolean;
}

export function BaziInputForm({ onSubmit, loading }: BaziInputFormProps) {
  const [nama, setNama] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate || !birthTime) return;
    onSubmit(nama, birthDate, birthTime);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto space-y-6 bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-serif text-white mb-2">Input Your Destiny Data</h3>
        <p className="text-sm text-slate-400">Provide your birth details for the BaZi chart calculation.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="nama" className="text-xs uppercase tracking-wider text-slate-400 font-mono">
            Name (Optional)
          </label>
          <Input
            id="nama"
            type="text"
            placeholder="John Doe"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            disabled={loading}
            className="bg-black/40 border-white/10 text-white focus:border-indigo-500/50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="birthDate" className="text-xs uppercase tracking-wider text-slate-400 font-mono">
            Date of Birth <span className="text-rose-500">*</span>
          </label>
          <Input
            id="birthDate"
            type="date"
            required
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            disabled={loading}
            className="bg-black/40 border-white/10 text-white focus:border-indigo-500/50 [color-scheme:dark]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="birthTime" className="text-xs uppercase tracking-wider text-slate-400 font-mono">
            Time of Birth <span className="text-rose-500">*</span>
          </label>
          <Input
            id="birthTime"
            type="time"
            required
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            disabled={loading}
            className="bg-black/40 border-white/10 text-white focus:border-indigo-500/50 [color-scheme:dark]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !birthDate || !birthTime}
        className="w-full py-3.5 px-6 mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Calculating Destiny...
          </>
        ) : (
          'Generate Chart'
        )}
      </button>
    </motion.form>
  );
}
