import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ChatClient from './ChatClient';
import StarrySkyCanvas from '@/components/animations/StarrySkyCanvas';

export const metadata = {
  title: 'Xiu (宿) Celestial | Chat',
  description: 'Query the BaZi AI celestial engine.',
  robots: { index: false, follow: false }
};

export default async function ChatPage() {
  const session = await getSession();
  
  if (!session.userId) {
    redirect('/login');
  }

  return (
    <div className="absolute inset-0 pt-[80px] z-10 flex flex-col">
      <ChatClient />
    </div>
  );
}
