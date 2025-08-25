export type Ingredient = {
slug: string;
title: string;
summary: string;
timing?: string[];
goals: Record<string, { evidence: 'A'|'B'|'C'; typical_dose_mg?: [number, number]; note?: string }>;
ul?: { eu_mg_per_day?: number; us_mg_per_day?: number; iu_per_day?: number };
contraindications?: string[];
interactions?: string[];
affiliates?: { eu?: { name: string; link: string }[]; us?: { name: string; link: string }[] };
};
