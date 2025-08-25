import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import HeroComic from '@/components/HeroComic';
import { getLatestPosts } from '@/lib/blog';

export default async function HomePage() {
  const posts = await getLatestPosts(3);
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Build a simple, clear supplement plan
          </h1>
          <p className="mt-3 text-gray-700">
            Two tools: create a weekly SuppPlan or sanity-check your current stack — totally free.
          </p>

          {/* BIG CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/planner" className="btn btn-primary btn-lg gap-2">
              {/* clipboard icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 4h6a2 2 0 0 1 2 2v1h-2.5a1.5 1.5 0 1 0-3 0H9V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="5" y="6" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 11h8M8 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Create new SuppPlan
            </Link>

            <Link href="/check" className="btn btn-outline btn-lg gap-2">
              {/* magnifying glass icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Check my stack
            </Link>
          </div>

          {/* HOW IT WORKS (free) */}
          <div className="mt-8 space-y-3">
            <h2 className="text-lg font-semibold">How it works (free)</h2>
            <ul className="text-gray-800 list-disc pl-5 space-y-1">
              <li>
                <strong>Planner</strong> suggests a weekly schedule using only items from our Library.
                Start here: <Link href="/planner" className="underline">Create a SuppPlan</Link>.
              </li>
              <li>
                <strong>Check</strong> reviews your existing stack for potential overlaps or timing clashes.
                Try it: <Link href="/check" className="underline">Check my stack</Link>.
              </li>
              <li>
                Browse background info in the <Link href="/library" className="underline">Library</Link>. It’s all free to use.
              </li>
            </ul>
          </div>
        </div>

        {/* Comic image now in the hero */}
        <HeroComic />
      </section>

      {/* AD SLOT under the buttons/how-it-works */}
      <section className="mt-12">
        <div className="card p-4">
          <AdSlot height={250} />
        </div>
      </section>

      {/* RICH SEO TEXT */}
      <section className="mt-12 prose max-w-none">
        <h2>Free supplement planner, stack checker, and ingredient library</h2>
        <p>
          SuppPlanner is a free <strong>supplement planner</strong> and <strong>stack checker</strong> designed to help you
          create a clear, weekly <strong>supplement plan</strong> and review your current stack for overlaps. The Planner
          only draws from our <strong>supplement library</strong> so recommendations stay consistent with our data on timing,
          typical ranges, and conservative heuristics around <strong>upper intake limits (ULs)</strong>.
        </p>
        <p>
          To get started, open the <Link href="/planner">Supplement Planner</Link> to generate a weekly schedule,
          use the <Link href="/check">Stack Checker</Link> to review what you’re already taking, and read short entries in the
          <Link href="/library">Ingredient Library</Link> for plain-language notes on timing, dose ranges, and considerations.
          Keep things simple, avoid unnecessary duplication, and focus on a plan you can actually follow.
        </p>
        <ul>
          <li><Link href="/planner">Supplement Planner</Link> — build a weekly schedule from curated ingredients.</li>
          <li><Link href="/check">Stack Checker</Link> — surface potential overlaps or timing conflicts.</li>
          <li><Link href="/library">Supplement Library</Link> — quick references for common ingredients.</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="font-medium">What does SuppPlanner do?</div>
            <p className="text-gray-700 mt-1">
              It helps you draft a simple weekly plan and review an existing stack with clear, conservative tips — for free.
            </p>
          </div>
          <div className="card p-4">
            <div className="font-medium">Where does the info come from?</div>
            <p className="text-gray-700 mt-1">
              Our dataset of common ingredients with timing notes and typical ranges. We keep entries short and practical.
            </p>
          </div>
          <div className="card p-4">
            <div className="font-medium">Do I need an account?</div>
            <p className="text-gray-700 mt-1">No account required — just use the tools.</p>
          </div>
          <div className="card p-4">
            <div className="font-medium">Can I share my plan?</div>
            <p className="text-gray-700 mt-1">Yes — export to .ics or copy the schedule text to share.</p>
          </div>
        </div>
      </section>

      {/* Latest blog posts */}
      <section className="mt-16">
        <h2 className="text-xl font-semibold">Latest from the blog</h2>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {posts.length === 0 && <div className="text-gray-600">No posts yet — coming soon.</div>}
          {posts.map(p => (
            <article key={p.slug} className="card p-4">
              <div className="text-sm text-gray-500">{p.date}</div>
              <h3 className="font-semibold mt-1">
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
              </h3>
              <p className="text-gray-700 mt-1 text-sm">{p.excerpt}</p>
              <Link href={`/blog/${p.slug}`} className="mt-2 inline-block underline">Read more</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
