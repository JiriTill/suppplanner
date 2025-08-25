import type { MetadataRoute } from 'next';
import { getAllIngredientSlugs, getAllGoalSlugs } from '@/lib/data';


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
const base = 'https://suppplan.example.com'; // TODO: set to your real domain
const staticPaths = ['/', '/planner', '/check', '/library', '/blog', '/terms', '/data-usage', '/contact'] as const;


const items: MetadataRoute.Sitemap = staticPaths.map((p) => ({
url: base + p,
changeFrequency: 'weekly' as const,
priority: 0.6,
}));


const ing = await getAllIngredientSlugs();
items.push(
...ing.map((slug) => ({
url: `${base}/library/ingredients/${slug}`,
changeFrequency: 'monthly' as const,
priority: 0.5,
}))
);


const goals = await getAllGoalSlugs();
items.push(
...goals.map((slug) => ({
url: `${base}/library/goals/${slug}`,
changeFrequency: 'monthly' as const,
priority: 0.5,
}))
);


return items;
}
