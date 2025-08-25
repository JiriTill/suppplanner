import Link from 'next/link';
export default async function HomePage() {
const posts = await getLatestPosts(3);
return (
<main className="mx-auto max-w-5xl px-4 py-12">
<section className="grid md:grid-cols-2 gap-8 items-center">
<div>
<h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Build a simple, safer supplement plan</h1>
<p className="mt-3 text-gray-700">Use our dataset‑aware planner to draft a weekly schedule, then sanity‑check your stack. Educational only — not medical advice.</p>
<div className="mt-6 flex flex-wrap gap-3">
<Link href="/planner" className="btn-primary">Open Planner</Link>
<Link href="/check" className="btn-outline">Check my stack</Link>
<Link href="/library" className="btn-outline">Browse Library</Link>
</div>
</div>
<div className="card p-4"><AdSlot /></div>
</section>


<div className="mt-8"><HeroComic /></div>


<section className="mt-16 prose max-w-none">
<h2>What is a supplement plan?</h2>
<p>A supplement plan is a simple schedule for if/when to take specific supplements over a typical week. Our goal is to help you draft a plan that is easy to follow, avoids obvious duplications, and stays mindful of typical upper intake limits (ULs). The app does not diagnose or treat conditions. It’s educational only and should not replace care from a qualified clinician.</p>
<h3>How SuppPlanner works</h3>
<ul>
<li><strong>Planner:</strong> pick your goals and context; we only draw from our ingredient library and show typical timing/dosing ranges for educational use.</li>
<li><strong>Check:</strong> paste your current stack to flag potential issues like overlaps or timing conflicts.</li>
<li><strong>Library:</strong> short, plain‑language pages on common ingredients — timing, typical ranges, and considerations.</li>
</ul>
<h3>Safety and limitations</h3>
<p>Supplements can interact with medications and medical conditions. When pregnant, breastfeeding, managing a condition, or taking prescription medicines, discuss changes with a clinician. Information here is general and may not apply to you.</p>
</section>


<section className="mt-16">
<h2 className="text-xl font-semibold">Frequently asked questions</h2>
<div className="mt-4 grid md:grid-cols-2 gap-4">
<div className="card p-4">
<div className="font-medium">Is this medical advice?</div>
<p className="text-gray-700 mt-1">No. This tool is educational only and not a substitute for professional advice.</p>
</div>
<div className="card p-4">
<div className="font-medium">Where do the ingredient facts come from?</div>
<p className="text-gray-700 mt-1">From our curated dataset of common supplements with timing notes and typical ranges. We aim to keep entries short, clear, and conservative.</p>
</div>
<div className="card p-4">
<div className="font-medium">Will this replace my clinician?</div>
<p className="text-gray-700 mt-1">No. Always consider your personal situation and medications, and involve your clinician when needed.</p>
</div>
<div className="card p-4">
<div className="font-medium">Do I need to sign up?</div>
<p className="text-gray-700 mt-1">No account required. You can export a calendar file to use privately.</p>
</div>
</div>
</section>


<section className="mt-16">
<h2 className="text-xl font-semibold">Latest from the blog</h2>
<div className="mt-4 grid md:grid-cols-3 gap-4">
{posts.length === 0 && (
<div className="text-gray-600">No posts yet — coming soon.</div>
)}
{posts.map(p => (
<article key={p.slug} className="card p-4">
<div className="text-sm text-gray-500">{p.date}</div>
<h3 className="font-semibold mt-1"><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
<p className="text-gray-700 mt-1 text-sm">{p.excerpt}</p>
<Link href={`/blog/${p.slug}`} className="mt-2 inline-block underline">Read more</Link>
</article>
))}
</div>
</section>
</main>
);
}
