import LuckDisplay from '@/components/features/LuckDisplay';

export default async function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col items-center py-6 md:py-10 px-4 w-full">
      <div className="w-full max-w-4xl mx-auto">
        <LuckDisplay />
      </div>
    </div>
  );
}
