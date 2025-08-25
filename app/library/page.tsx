import { getAllIngredientSummaries, getAllGoals } from '@/lib/data';
import Link from 'next/link';
import SEO from '@/components/SEO';


export const revalidate = 86400; // daily rebuild


export default async function LibraryPage() {
const ingredients = await getAllIngredientSummaries();
const goals = await getAllGoals();
return (
<div className="space-y-6">
<SEO title="Supplement Library" description="Evidence-aware ingredient profiles and goal-based guides." />
<h1 className="text-3xl font-bold text-primary">Library</h1>


<section>
<h2 className="text-xl font-semibold mb-2">Goals</h2>
<div className="grid md:grid-cols-3 gap-2">
{goals.map(g => (
<Link key={g.slug} href={`/library/goals/${g.slug}`} className="block bg-white p-4 rounded-xl shadow hover:shadow-md">
<div className="font-medium">{g.name}</div>
<div className="text-sm text-gray-600">Common supplements for {g.name.toLowerCase()}</div>
</Link>
))}
</div>
</section>


<section>
<h2 className="text-xl font-semibold mb-2">Ingredients</h2>
<div className="grid md:grid-cols-3 gap-2">
{ingredients.map(ing => (
<Link key={ing.slug} href={`/library/ingredients/${ing.slug}`} className="block bg-white p-4 rounded-xl shadow hover:shadow-md">
<div className="font-medium capitalize">{ing.title}</div>
<div className="text-sm text-gray-600">{ing.snippet}</div>
</Link>
))}
</div>
</section>
</div>
);
}
