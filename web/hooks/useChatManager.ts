import { useState, useRef, useEffect, UIEvent } from 'react';
import api from '@/lib/api';
import { useChatStore, Message, INITIAL_MESSAGE } from '@/stores/useChatStore';
import { extractReplyFromResponse, generateChatTitle } from '@/lib/chat-utils';

export function useChatManager() {
  const { 
    sessions, 
    activeSessionId, 
    createSession, 
    switchSession, 
    deleteSession, 
    addMessage 
  } = useChatStore();

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [prevSessionId, setPrevSessionId] = useState(activeSessionId);

  // Reset visible count when switching sessions (derive state during render)
  if (activeSessionId !== prevSessionId) {
    setPrevSessionId(activeSessionId);
    setVisibleCount(5);
  }

  // Derive state based on active session
  const activeSession = activeSessionId ? sessions.find((s) => s.id === activeSessionId) : null;
  // If activeSession is null (New Reading), we simulate a temporary message array 
  // containing only the INITIAL_MESSAGE.
  const messages = activeSession ? activeSession.messages : [INITIAL_MESSAGE];
  
  const visibleMessages = messages.slice(Math.max(messages.length - visibleCount, 0));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Only auto-scroll if we haven't loaded older messages, or if it's a brand new message
    scrollToBottom();
  }, [messages.length, isLoading]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollTop <= 5) { // If at the top
      if (visibleCount < messages.length) {
        // Load 5 more
        setVisibleCount(prev => Math.min(prev + 5, messages.length));
      }
    }
  };

  const handleNewChat = () => {
    switchSession(null);
    setIsSidebarOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userText
    };

    let targetSessionId = activeSessionId;

    // If it's a new reading (activeSessionId is null), create the session now.
    if (!targetSessionId) {
      const title = generateChatTitle(userText);
      targetSessionId = createSession(newUserMsg, title);
    } else {
      addMessage(targetSessionId, newUserMsg);
    }
    
    setIsLoading(true);

    try {
      // Send last 5 messages for context
      // Note: we fetch messages again in case targetSessionId was just created
      const currentMessages = targetSessionId 
        ? sessions.find(s => s.id === targetSessionId)?.messages || [INITIAL_MESSAGE, newUserMsg]
        : [INITIAL_MESSAGE, newUserMsg];

      const historyCtx = currentMessages.slice(-5).map(m => ({ role: m.role, content: m.content }));
      
      const res = await api.post('/api/chat', {
        message: userText,
        history: historyCtx
      });

      const reply = extractReplyFromResponse(res.data);

      addMessage(targetSessionId, {
        id: Date.now().toString(),
        role: 'assistant',
        content: reply
      });
    } catch (error: unknown) {
      console.error(error);
      const errorMsg = (error as Error).message || 'Gagal terhubung ke Celestial Engine.';
      
      addMessage(targetSessionId, {
        id: Date.now().toString(),
        role: 'assistant',
        content: `System Error: ${errorMsg}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    state: {
      sessions,
      activeSessionId,
      input,
      isLoading,
      isSidebarOpen,
      visibleCount,
      messages,
      visibleMessages,
      messagesEndRef
    },
    actions: {
      setInput,
      setIsSidebarOpen,
      switchSession,
      deleteSession,
      handleScroll,
      handleNewChat,
      handleSubmit
    }
  };
}
