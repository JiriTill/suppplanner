import Link from 'next/link';
import AdSlot from '@/components/AdSlot';


export default async function HomePage() {
return (
<main className="mx-auto max-w-5xl px-4 py-12">
<section className="grid md:grid-cols-2 gap-8 items-center">
<div>
<h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Build a simple, safe(er) supplement plan</h1>
<p className="mt-3 text-gray-700">Use our dataset‑aware planner to draft a weekly schedule, then sanity‑check your stack. Educational only — not medical advice.</p>
<div className="mt-6 flex flex-wrap gap-3">
<Link href="/planner" className="px-4 py-2 rounded-xl bg-primary text-white shadow">Open Planner</Link>
<Link href="/check" className="px-4 py-2 rounded-xl border">Check my stack</Link>
<Link href="/library" className="px-4 py-2 rounded-xl border">Browse Library</Link>
</div>
</div>
<div className="rounded-2xl border p-4 bg-white shadow-sm">
<AdSlot />
</div>
</section>


<section className="mt-16">
<h2 className="text-xl font-semibold">Why SuppPlanner?</h2>
<ul className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
<li className="rounded-xl border p-4 bg-white"><div className="font-medium">Dataset‑aware</div><p className="text-gray-700 mt-1">Planner limits choices to our library with clear timing + UL notes.</p></li>
<li className="rounded-xl border p-4 bg-white"><div className="font-medium">Simple UI</div><p className="text-gray-700 mt-1">No signup required. Generate, adjust, and export.</p></li>
<li className="rounded-xl border p-4 bg-white"><div className="font-medium">Privacy‑respecting</div><p className="text-gray-700 mt-1">No third‑party trackers by default.</p></li>
</ul>
</section>


<section className="mt-16">
<h2 className="text-xl font-semibold">Get started</h2>
<ol className="mt-4 space-y-3 list-decimal list-inside text-gray-800">
<li>Open the <Link href="/planner" className="underline">Planner</Link> and pick your goals</li>
<li>Review the weekly plan (educational only)</li>
<li>Export .ics or copy your schedule</li>
<li>Browse the <Link href="/library" className="underline">Library</Link> for timing & interactions</li>
</ol>
</section>
</main>
);
}
