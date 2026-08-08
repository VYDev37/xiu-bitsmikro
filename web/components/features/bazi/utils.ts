export type ElementType = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water' | 'Kayu' | 'Api' | 'Tanah' | 'Logam' | 'Air';

export const getElementColor = (element: string) => {
  const el = element.toLowerCase();
  if (el.includes('wood') || el.includes('kayu')) return { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' };
  if (el.includes('fire') || el.includes('api')) return { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30' };
  if (el.includes('earth') || el.includes('tanah')) return { bg: 'bg-amber-600/20', text: 'text-amber-500', border: 'border-amber-600/30' };
  if (el.includes('metal') || el.includes('logam')) return { bg: 'bg-slate-300/20', text: 'text-slate-300', border: 'border-slate-300/30' };
  if (el.includes('water') || el.includes('air')) return { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' };
  return { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30' };
};
