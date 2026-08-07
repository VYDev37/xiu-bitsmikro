import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ChatClient from './ChatClient';
import StarrySkyCanvas from '@/components/animations/StarrySkyCanvas';

export const metadata = {
  title: 'Celestial Engine Chat - Aetheria',
  description: 'Ask any question to the BaZi AI celestial engine.',
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
