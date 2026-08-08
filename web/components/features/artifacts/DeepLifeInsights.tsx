import { InsightCard } from "@/components/features/artifacts/InsightCard";

const INSIGHT_CARDS_DATA = [
  { category: "Love", chineseTitle: "缘分", description: "Romantic tendencies and compatible partner types." },
  { category: "Career", chineseTitle: "事业", description: "Your career journey, peak periods, and challenges." },
  { category: "Recommended Path", chineseTitle: "职业", description: "Concrete professions that harmonize with your elements." },
  { category: "Wealth", chineseTitle: "财运", description: "Financial patterns and wealth generation strategies." },
  { category: "Relationship", chineseTitle: "人际", description: "Dynamics in family, friendship, and general networks." },
  { category: "Compatibility", chineseTitle: "合婚", description: "Check relationship harmony with another person.", requiresPartner: true }
];

export function DeepLifeInsights() {
  return (
    <div className="pt-8 border-t border-white/10 mt-12">
      <div className="flex flex-col items-center justify-center text-center space-y-2 mb-10">
        <h2 className="text-2xl font-bold font-serif tracking-tight">Deep Life Insights</h2>
        <p className="text-muted-foreground text-sm max-w-lg">Click on any card to reveal AI-generated interpretation of your destiny path.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {INSIGHT_CARDS_DATA.map((card) => (
          <InsightCard
            key={card.category}
            category={card.category}
            chineseTitle={card.chineseTitle}
            description={card.description}
            requiresPartner={card.requiresPartner}
          />
        ))}
      </div>
    </div>
  );
}
