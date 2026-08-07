import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  // Creates a session starting with the initial message and the first user message
  createSession: (firstUserMessage: Message, title: string) => string;
  deleteSession: (id: string) => void;
  switchSession: (id: string | null) => void;
  addMessage: (sessionId: string, message: Message) => void;
}

export const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'assistant',
  content: 'Selamat datang. Saya adalah Celestial Engine. Ada yang ingin Anda tanyakan seputar BaZi, elemen nasib, atau saran Wuxing?'
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      sessions: [],
      activeSessionId: null, // null represents a "New Reading" blank state

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

        return newSessionId;
      },

      deleteSession: (id: string) => {
        set((state) => {
          const newSessions = state.sessions.filter((s) => s.id !== id);
          let newActiveId = state.activeSessionId;
          
          if (newActiveId === id) {
            // Default to null (New Reading) when a session is deleted and it was the active one
            newActiveId = null;
          }
          
          return {
            sessions: newSessions,
            activeSessionId: newActiveId,
          };
        });
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
      },
    }),
    {
      name: 'bazi-chat-storage', // key in local storage
    }
  )
);
