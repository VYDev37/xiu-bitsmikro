import type { LuckData } from '@/schemas/luck';

export function BaziElements({ data }: { data: NonNullable<LuckData['data_extraction']> }) {
  const { user_a, current_date_shio } = data;

  if (!user_a && !current_date_shio) return null;

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {user_a?.pilar_tahun_shio && (
        <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-mono">
          Year: {user_a.pilar_tahun_shio}
        </span>
      )}
      {user_a?.pilar_jam_shio && (
        <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-mono">
          Hour: {user_a.pilar_jam_shio}
        </span>
      )}
      {user_a?.elemen_dominan && (
        <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-mono">
          Element: {user_a.elemen_dominan}
        </span>
      )}
      {current_date_shio && (
        <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-mono">
          This year: {current_date_shio}
        </span>
      )}
    </div>
  );
}
