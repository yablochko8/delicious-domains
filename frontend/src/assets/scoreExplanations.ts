export const scoreIds = [
  "evoc",
  "brev",
  "pron",
  "find",
  "spel",
  "legs",
] as const;

export type ScoreId = (typeof scoreIds)[number];

type ScoreCategory = {
  id: ScoreId;
  name: string;
  description: string;
};

export const scoreExplanations: ScoreCategory[] = [
  {
    id: "evoc",
    name: "Evocative",
    description:
      "Conveys at least a hint of what it's naming, ideally with a bit of flair and emotion.",
  },
  {
    id: "brev",
    name: "Brief",
    description: "Shorter = better",
  },
  {
    id: "pron",
    name: "Pronounceable",
    description:
      "You can read it out loud when you see it. Bonus points for alliteration or related patterns, including classy consonance, arrogant assonance, and explosive plosives.",
  },
  {
    id: "find",
    name: "Findable",
    description:
      "Reasonably unique. For new brands you want to be googlable. For growing brands you want to be distinct enough to be recognised by an LLM without context. You definitely don't want to be at risk of being perceived as a copycat.",
  },
  {
    id: "spel",
    name: "Spellable",
    description:
      "You know how it's spelled when you hear it. The spelling should not be annoying.",
  },
  {
    id: "legs",
    name: "Legs",
    description:
      "Enables a wider branding or story scheme, has some obvious imagery",
  },
];

export const scoreExplanationDict = scoreExplanations.reduce((acc, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {} as Record<ScoreId, ScoreCategory>);
