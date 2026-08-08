"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import api from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InsightCardSchema } from "@/schemas/bazi";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Sparkles, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PartnerFormValues } from "@/schemas/bazi";
import { PartnerCompatibilityForm } from "./PartnerCompatibilityForm";

interface InsightCardProps {
  category: string;
  chineseTitle: string;
  description: string;
  requiresPartner?: boolean;
}

// Separate Form Component (SoC)


export function InsightCard({ category, chineseTitle, description, requiresPartner }: InsightCardProps) {
  const { user } = useUserStore();
  const [data, setData] = useState<{ category: string, content: string | Record<string, unknown> } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const fetchInsight = async (partnerData?: { nama: string; birth_date: string; birth_time: string }) => {
    if (!user || !user.name || !user.birthDate || !user.birthTime) return;
    if (data) return; // Don't refetch if we already have data

    setLoading(true);
    setError("");
    try {
      const payload = {
        category,
        timezone: "WIB",
        user_a: {
          nama: user.name,
          birth_date: user.birthDate,
          birth_time: user.birthTime
        },
        user_b: partnerData
      };

      const res = await api.post("/artifacts/insight", payload);

      const json = res.data;
      // Zod validation
      const dataToParse = json.result?.insight_card || json.insight_card || (json.category ? json : null);
      const parsed = InsightCardSchema.safeParse(dataToParse);
      if (parsed.success) {
        setData(parsed.data);
      } else {
        throw new Error("Invalid data format received from server");
      }
    } catch (err: unknown) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch when opened if no partner required
  useEffect(() => {
    if (isOpen && user && user.name && user.birthDate && user.birthTime && !requiresPartner && !data && !loading && !error) {
      fetchInsight();
    }
  }, [isOpen, user, requiresPartner, data, loading, error]);

  const handlePartnerSubmit = (data: PartnerFormValues) => {
    fetchInsight({
      nama: data.partnerName,
      birth_date: data.partnerDob,
      birth_time: data.partnerTime || ""
    });
  };

  return (
    <div className="relative w-full h-[380px] md:h-[450px] group [perspective:1000px]">
      <div
        className={cn(
          "w-full h-full transition-all duration-700 [transform-style:preserve-3d] relative",
          isOpen ? "[transform:rotateY(180deg)]" : ""
        )}
      >
        {/* FRONT FACE (Closed) */}
        <Card
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-6 border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 cursor-pointer [backface-visibility:hidden] transition-colors overflow-hidden"
          onClick={() => setIsOpen(true)}
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 md:mb-6">
            <span className="text-3xl md:text-4xl font-serif text-blue-400/80 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">{chineseTitle}</span>
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold mb-2 md:mb-3 line-clamp-2">{category}</CardTitle>
          <CardDescription className="max-w-[280px] text-xs md:text-sm text-slate-300 line-clamp-4">
            {description}
          </CardDescription>
          <div className="mt-6 md:mt-8 text-[10px] md:text-xs text-blue-300/50 flex items-center gap-1 md:gap-2 tracking-widest uppercase">
            <Sparkles className="w-3 h-3" />
            Click to reveal
          </div>
        </Card>

        {/* BACK FACE (Opened) */}
        <Card
          className="absolute inset-0 flex flex-col p-6 border-white/10 bg-gradient-to-b from-[#020617] to-slate-900 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <div className="flex justify-between items-start mb-4 pb-4 border-b border-white/10 shrink-0">
            <div>
              <CardTitle className="text-xl font-bold text-blue-400">{category}</CardTitle>
              <span className="text-sm font-serif text-muted-foreground">{chineseTitle} Interpretation</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
              title="Close"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>

          <CardContent className="flex-1 overflow-y-auto px-0 pt-0 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
            {requiresPartner && !data && !loading && (
              <PartnerCompatibilityForm onSubmit={handlePartnerSubmit} />
            )}

            {loading && (
              <div className="space-y-4 py-4">
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="h-4 w-[90%] bg-white/10" />
                <Skeleton className="h-4 w-[95%] bg-white/10" />
                <Skeleton className="h-4 w-[80%] bg-white/10" />
                <div className="flex items-center text-xs text-blue-400/70 mt-6 font-mono">
                  <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                  <span className="animate-pulse">Deep interpreting BaZi variables...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="text-sm text-red-400 bg-red-950/30 p-4 rounded-lg border border-red-900/50">
                {error}
              </div>
            )}

            {data && !loading && (
              <div className="text-sm leading-relaxed text-slate-200 prose dark:prose-invert prose-sm max-w-none pb-4">
                {typeof data.content === 'string'
                  ? data.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))
                  : <p>{JSON.stringify(data.content)}</p>
                }
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
