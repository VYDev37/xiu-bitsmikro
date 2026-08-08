import { ArtifactsClient } from "./ArtifactsClient";

export const metadata = {
  title: 'Xiu (宿) Celestial | Artifacts',
  description: 'View your AI-generated BaZi destiny insights.',
  robots: { index: false, follow: false }
};

export default function ArtifactsPage() {
  return <ArtifactsClient />;
}
