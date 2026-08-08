import BaziClient from './BaziClient';

export const metadata = {
  title: 'Xiu (宿) Celestial | BaZi Chart',
  description: 'Generate your BaZi (Four Pillars of Destiny) chart.',
  robots: { index: false, follow: false }
};

export default function BaziPage() {
  return <BaziClient />;
}
