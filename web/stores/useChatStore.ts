import { create } from 'zustand';
import api from '@/lib/api';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export type ChatSession = {
  id: string;
  title: string;
  createdAt: number;
  messages: Message[];
};

interface ChatStore {
  sessions: ChatSession[];
  activeSessionId: string | null;
  isLoading: boolean;
  fetchSessions: () => Promise<void>;
  createSession: (firstUserMessage: Message, title: string) => string;
  deleteSession: (id: string) => void;
  switchSession: (id: string | null) => void;
  addMessage: (sessionId: string, message: Message) => void;
  clearSessions: () => void;
}

export const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'assistant',
  content: 'Welcome. I am the Celestial Engine. Ask me about BaZi, destiny elements, or Wuxing guidance.'
};

export const useChatStore = create<ChatStore>()((set) => ({
  sessions: [],
  activeSessionId: null,
  isLoading: false,

  fetchSessions: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/chat/sessions');
      set({ sessions: response.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch chat sessions', error);
      set({ isLoading: false });
    }
  },

  clearSessions: () => {
    set({ sessions: [], activeSessionId: null });
  },

  createSession: (firstUserMessage: Message, title: string) => {
    const newSessionId = Date.now().toString();
      
    const newSession: ChatSession = {
      id: newSessionId,
      title,
      createdAt: Date.now(),
      messages: [INITIAL_MESSAGE, firstUserMessage],
    };

    set((state) => ({
      sessions: [newSession, ...state.sessions],
      activeSessionId: newSessionId,
    }));

    // Optimistic background DB update
    api.post('/chat/sessions', {
      id: newSessionId,
      title,
      initialMessage: INITIAL_MESSAGE,
      firstUserMessage
    }).catch(err => console.error("Failed to save session to DB", err));

    return newSessionId;
  },

  deleteSession: (id: string) => {
    set((state) => {
      const newSessions = state.sessions.filter((s) => s.id !== id);
      let newActiveId = state.activeSessionId;
      
      if (newActiveId === id) {
        newActiveId = null;
      }
      
      return {
        sessions: newSessions,
        activeSessionId: newActiveId,
      };
    });

    api.delete(`/chat/sessions?id=${id}`).catch(err => console.error("Failed to delete session", err));
  },

  switchSession: (id: string | null) => {
    set({ activeSessionId: id });
  },

  addMessage: (sessionId: string, message: Message) => {
    set((state) => {
      const sessionIndex = state.sessions.findIndex((s) => s.id === sessionId);
      if (sessionIndex === -1) return state;

      const newSessions = [...state.sessions];
      const session = { ...newSessions[sessionIndex] };
      
      session.messages = [...session.messages, message];
      newSessions[sessionIndex] = session;

      return { sessions: newSessions };
    });

    api.put('/chat/sessions', {
      sessionId,
      message
    }).catch(err => console.error("Failed to save message to DB", err));
  },
}));
