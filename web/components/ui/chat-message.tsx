import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={cn("flex w-full mb-6", isUser ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4",
        isUser 
          ? "bg-blue-500/10 border border-blue-500/20 text-blue-100 rounded-tr-none shadow-[0_0_15px_rgba(56,189,248,0.1)]" 
          : "bg-white/[0.03] border border-white/10 text-slate-300 rounded-tl-none shadow-lg backdrop-blur-sm"
      )}>
        <div className="flex items-center gap-2 mb-2 opacity-60">
          {isUser ? (
            <>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-300">You</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                <path d="m12 14 4-4" />
                <path d="M3.34 19a10 10 0 1 1 17.32 0" />
              </svg>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-300">Celestial Engine</span>
            </>
          )}
        </div>
        <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans normal-case text-left">
          {content}
        </div>
      </div>
    </div>
  );
}
