/** Shared shape for the long-form case studies opened from a project card. */

export interface CaseStudyScreen {
  src: string;
  alt: string;
  caption: string;
  /** Spans both columns of the gallery grid. */
  wide?: boolean;
  /** Tall (phone) screenshot: shown narrower and centred. */
  portrait?: boolean;
}

export interface CaseStudy {
  title: string;
  subtitle: string;
  /** Small line above the title, e.g. the main technologies. */
  tagline: string;
  builtFor?: string;
  pdf?: string;
  liveUrl?: string;
  overview: string[];
  /** Defaults to "The problem". */
  problemTitle?: string;
  problem: { intro: string; points: string[] };
  /** Defaults to "The solution". */
  solutionTitle?: string;
  solution: string;
  screens?: CaseStudyScreen[];
  screensNote?: string;
  features: { group: string; items: { title: string; text: string }[] }[];
  architecture: { title: string; tech: string; text: string }[];
  architectureNote: string;
  highlights: { area: string; text: string }[];
  challenges: { title: string; text: string }[];
  stack: string[];
  outcome: string;
}
