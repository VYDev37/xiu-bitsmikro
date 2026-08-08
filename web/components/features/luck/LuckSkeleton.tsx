import SpotlightCard from '@/components/ui/SpotlightCard';
import DynamicStarrySky from '@/components/animations/DynamicStarrySky';
import { Skeleton } from '@/components/ui/skeleton';

export function LuckSkeleton() {
  return (
    <SpotlightCard className="w-full p-6 md:p-10 relative overflow-hidden min-h-[400px]">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <DynamicStarrySky />
      </div>
      <div className="relative z-10 flex flex-col h-full space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-6 w-32 bg-blue-900/20" />
          <Skeleton className="h-10 w-64 bg-blue-900/20" />
        </div>
        <div className="flex justify-center gap-3">
          <Skeleton className="h-8 w-24 rounded-full bg-blue-900/20" />
          <Skeleton className="h-8 w-24 rounded-full bg-blue-900/20" />
          <Skeleton className="h-8 w-24 rounded-full bg-blue-900/20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-32 w-full rounded-2xl bg-blue-900/20" />
          <Skeleton className="h-32 w-full rounded-2xl bg-blue-900/20" />
        </div>
      </div>
    </SpotlightCard>
  );
}
