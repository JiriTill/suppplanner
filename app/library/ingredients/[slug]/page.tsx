import { getIngredientBySlug, getAllIngredientSlugs } from '@/lib/data';
import { Metadata } from 'next';
import Link from 'next/link';


export const revalidate = 86400;


export async function generateStaticParams() {
const slugs = await getAllIngredientSlugs();
return slugs.map(slug => ({ slug }));
}


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
const ing = await getIngredientBySlug(params.slug);
return {
title: `${ing.title} – Supplement Library`,
description: `Timing, common doses, and considerations for ${ing.title}.`
};
}


export default async function IngredientPage({ params }: { params: { slug: string } }) {
const ing = await getIngredientBySlug(params.slug);
return (
<article className="prose max-w-none">
<nav className="mb-4 text-sm"><Link href="/library">Library</Link> / Ingredients</nav>
<h1 className="capitalize">{ing.title}</h1>
<p className="text-gray-700">{ing.summary}</p>


{ing.timing?.length > 0 && (
<section>
<h2>Timing & Usage</h2>
<ul>{ing.timing.map((t: string, i: number) => <li key={i}>{t}</li>)}</ul>
</section>
)}


{Object.keys(ing.goals || {}).length > 0 && (
<section>
<h2>Common Goals</h2>
<ul>
{Object.entries(ing.goals).map(([goal, info]: any) => (
<li key={goal}><strong className="capitalize">{goal}</strong>: typical {info.typical_dose_mg?.join('–')} mg{info.note ? ` – ${info.note}` : ''}</li>
))}
</ul>
</section>
)}


{ing.interactions?.length > 0 && (
<section>
<h2>Potential Interactions</h2>
<ul>{ing.interactions.map((x: string, i: number) => <li key={i}>{x}</li>)}</ul>
</section>
)}


{ing.contraindications?.length > 0 && (
<section>
<h2>Considerations</h2>
<ul>{ing.contraindications.map((x: string, i: number) => <li key={i}>{x}</li>)}</ul>
</section>
)}


<section>
}
