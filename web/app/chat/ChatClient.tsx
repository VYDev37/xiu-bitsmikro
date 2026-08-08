'use client';

import { ChatMessage } from '@/components/ui/chat-message';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, MessageSquare, Trash2, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChatManager } from '@/hooks/useChatManager';
import { AIDisclaimer } from '@/components/ui/AIDisclaimer';

export default function ChatClient() {
  const { state, actions } = useChatManager();

  const {
    sessions,
    activeSessionId,
    input,
    isLoading,
    isSidebarOpen,
    visibleCount,
    messages,
    visibleMessages,
    messagesEndRef
  } = state;

  const {
    setInput,
    setIsSidebarOpen,
    switchSession,
    deleteSession,
    handleScroll,
    handleNewChat,
    handleSubmit,
    handleRetry
  } = actions;

  return (
    <div className="flex h-full w-full relative z-10 overflow-hidden">

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed md:static inset-y-0 left-0 z-50 w-72 bg-[#020617]/95 md:bg-[#020617]/40 border-r border-white/5 backdrop-blur-xl transition-transform duration-300 ease-in-out flex flex-col pt-20 md:pt-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Mobile close button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="p-4">
          <Button
            onClick={handleNewChat}
            className="w-full flex items-center justify-start gap-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 rounded-xl transition-all"
          >
            <PlusCircle size={18} />
            <span>New Reading</span>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
          <div className="text-xs font-mono text-slate-500 mb-3 px-3 uppercase tracking-wider">Recent Sessions</div>
          {sessions.map(session => (
            <div
              key={session.id}
              className={cn(
                "group flex items-center justify-between px-3 py-3 rounded-xl mb-1 cursor-pointer transition-all",
                session.id === activeSessionId
                  ? "bg-white/10 text-blue-200"
                  : "hover:bg-white/5 text-slate-400 hover:text-slate-200"
              )}
              onClick={() => {
                switchSession(session.id);
                setIsSidebarOpen(false);
              }}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <MessageSquare size={16} className={session.id === activeSessionId ? "text-blue-400" : "opacity-70"} />
                <span className="truncate text-sm font-medium">{session.title}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSession(session.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-transparent relative pt-16 md:pt-0">

        {/* Mobile Header (Hamburger) */}
        <div className="absolute top-0 left-0 right-0 h-16 flex items-center px-4 md:hidden z-30 bg-gradient-to-b from-[#030712] to-transparent">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-blue-300 hover:bg-white/5 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <span className="ml-2 font-mono text-sm tracking-widest text-blue-400 uppercase">Celestial Engine</span>
        </div>

        {/* Chat Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 sm:px-8 pb-2 custom-scrollbar flex flex-col"
          onScroll={handleScroll}
        >
          {/* Spacer to push chat to bottom when sparse */}
          <div className="flex-1 min-h-[1rem]" />

          <div className="pt-8 max-w-4xl mx-auto w-full shrink-0">
            {visibleCount < messages.length && (
              <div className="w-full text-center mb-6">
                <span className="text-xs text-slate-500 font-mono tracking-widest uppercase bg-white/5 px-3 py-1 rounded-full">
                  Scroll up to load older messages
                </span>
              </div>
            )}
            {visibleMessages.map((msg, index) => {
              const isLast = index === visibleMessages.length - 1;
              const isAssistant = msg.role === 'assistant';
              const showRetry = isLast && isAssistant && !isLoading;
              
              return (
                <ChatMessage 
                  key={msg.id} 
                  role={msg.role} 
                  content={msg.content} 
                  showRetry={showRetry}
                  onRetry={handleRetry}
                />
              );
            })}
            {isLoading && (
              <div className="flex w-full mb-6 justify-start">
                <div className="bg-white/[0.03] border border-white/10 text-slate-400 rounded-2xl rounded-tl-none px-5 py-4 flex items-center gap-2 shadow-lg backdrop-blur-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div className="shrink-0 relative px-4 sm:px-8 pb-6 md:pb-8 pt-2">
          <div className="max-w-4xl mx-auto relative">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Ask about shio, element, destiny..."
                className="w-full h-14 bg-[#020617]/80 border-white/10 text-white rounded-2xl pl-5 pr-14 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 backdrop-blur-xl shadow-lg"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 h-10 w-10 p-0 rounded-xl bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 border border-blue-400/30 transition-all flex items-center justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </Button>
            </form>
            <div className="mt-4">
              <AIDisclaimer />
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.01); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(56, 189, 248, 0.15); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(56, 189, 248, 0.3); }
      `}} />
    </div>
  );
}
