import React from 'react';
</nav>


<h1 className="capitalize">{ing.title}</h1>
<p className="text-gray-700">{ing.summary}</p>


{Array.isArray(ing.timing) && ing.timing.length > 0 && (
<section>
<h2>Timing & Usage</h2>
<ul>
{ing.timing.map((t: string, i: number) => (
<li key={i}>{t}</li>
))}
</ul>
</section>
)}


{ing.goals && Object.keys(ing.goals).length > 0 && (
<section>
<h2>Common Goals</h2>
<ul>
{Object.entries(ing.goals).map(([goal, info]: any) => (
<li key={goal}>
<strong className="capitalize">{goal}</strong>: {info?.typical_dose_mg ? `typical ${info.typical_dose_mg.join('–')} mg` : 'see notes'}
{info?.note ? ` – ${info.note}` : ''}
</li>
))}
</ul>
</section>
)}


{Array.isArray(ing.interactions) && ing.interactions.length > 0 && (
<section>
<h2>Potential Interactions</h2>
<ul>
{ing.interactions.map((x: string, i: number) => (
<li key={i}>{x}</li>
))}
</ul>
</section>
)}


{Array.isArray(ing.contraindications) && ing.contraindications.length > 0 && (
<section>
<h2>Considerations</h2>
<ul>
{ing.contraindications.map((x: string, i: number) => (
<li key={i}>{x}</li>
))}
</ul>
</section>
)}


<section>
<h2>Shopping</h2>
<p className="text-sm text-gray-600">Affiliate links may earn us a commission. This is not medical advice.</p>
<ul>
{Array.isArray(ing.affiliates?.eu) && ing.affiliates.eu.map((a: any, i: number) => (
<li key={`eu-${i}`}>
<a className="underline" href={a.link} target="_blank" rel="noreferrer">EU: {a.name}</a>
</li>
))}
{Array.isArray(ing.affiliates?.us) && ing.affiliates.us.map((a: any, i: number) => (
<li key={`us-${i}`}>
<a className="underline" href={a.link} target="_blank" rel="noreferrer">US: {a.name}</a>
</li>
))}
</ul>
</section>


<p className="text-xs text-gray-500">Educational use only. Not medical advice.</p>
</article>
);
}
