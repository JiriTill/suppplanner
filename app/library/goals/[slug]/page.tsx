import { getGoalBySlug, getIngredientsForGoal, getAllGoalSlugs } from '@/lib/data';
import Link from 'next/link';
import { Metadata } from 'next';


export const revalidate = 86400;


export async function generateStaticParams() {
const slugs = await getAllGoalSlugs();
return slugs.map(slug => ({ slug }));
}


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
const g = await getGoalBySlug(params.slug);
return { title: `${g.name} – Supplements`, description: `Common supplements people use for ${g.name.toLowerCase()}.` };
}


export default async function GoalPage({ params }: { params: { slug: string } }) {
const goal = await getGoalBySlug(params.slug);
const ingredients = await getIngredientsForGoal(params.slug);
return (
<article className="prose max-w-none">
<nav className="mb-4 text-sm"><Link href="/library">Library</Link> / Goals</nav>
<h1>{goal.name}</h1>
<p className="text-gray-700">Below are commonly used ingredients for {goal.name.toLowerCase()}. This is educational content, not medical advice.</p>
<ul>
{ingredients.map(ing => (
<li key={ing.slug}><Link className="underline" href={`/library/ingredients/${ing.slug}`}>{ing.title}</Link> – {ing.summary}</li>
))}
</ul>
</article>
);
}
