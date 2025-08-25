import Link from 'next/link';
import { getIngredientBySlug, getAllIngredientSlugs } from '@/lib/data';

export const revalidate = 86400;

export async function generateStaticParams() {
  const slugs = await getAllIngredientSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function IngredientPage({ params }: { params: { slug: string } }) {
  const ing = await getIngredientBySlug(params.slug);

  return (
    <div className="prose max-w-none">
      <p className="mb-4 text-sm">
        <Link href="/library" className="underline">Library</Link> / Ingredients
      </p>

      <h1 className="capitalize">{ing.title}</h1>
      <p className="text-gray-700">{ing.summary}</p>

      {Array.isArray(ing.timing) && ing.timing.length > 0 && (
        <>
          <h2>Timing &amp; Usage</h2>
          <ul>
            {ing.timing.map((t: string, i: number) => <li key={i}>{t}</li>)}
          </ul>
        </>
      )}

      {ing.goals && Object.keys(ing.goals).length > 0 && (
        <>
          <h2>Common Goals</h2>
          <ul>
            {Object.entries(ing.goals).map(([goal, info]: any) => (
              <li key={goal}>
                <strong className="capitalize">{goal}</strong>
                {info?.typical_dose_mg ? `: typical ${info.typical_dose_mg.join('–')} mg` : ''}
                {info?.note ? ` – ${info.note}` : ''}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
