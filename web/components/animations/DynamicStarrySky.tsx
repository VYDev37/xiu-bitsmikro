'use client';

import dynamic from 'next/dynamic';

const StarrySkyCanvas = dynamic(() => import('./StarrySkyCanvas'), { ssr: false });

export default function DynamicStarrySky() {
  return <StarrySkyCanvas />;
}
