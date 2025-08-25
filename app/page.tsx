import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import HeroComic from '@/components/HeroComic';
import { getLatestPosts } from '@/lib/blog';

export default async function HomePage() {
  const posts = await getLatestPosts(3);

  // --- JSON-LD structured data (FAQ, HowTo, Services) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does SuppPlanner do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It helps you draft a simple weekly plan and review an existing stack with clear, conservative tips — for free."
            }
          },
          {
            "@type": "Question",
            "name": "Is SuppPlanner free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The Planner, Checker, and Library are free to use."
            }
          },
          {
            "@type": "Question",
            "name": "Where does the info come from?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "From our curated dataset of common ingredients with timing notes and typical ranges. Entries are kept short and practical."
            }
          },
          {
            "@type": "Question",
            "name": "Can I share my plan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes — you can export to a calendar file (.ics) or copy the schedule text."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to create a simple supplement plan",
        "description": "Use SuppPlanner’s free tools to generate a weekly supplement plan and review your current stack.",
        "step": [
          { "@type": "HowToStep", "name": "Open Planner", "text": "Go to the Planner to start a new SuppPlan." },
          { "@type": "HowToStep", "name": "Pick goals", "text": "Choose your primary goals to keep the plan focused." },
          { "@type": "HowToStep", "name": "Review the schedule", "text": "We propose a simple weekly schedule using our Library." },
          { "@type": "HowToStep", "name": "Check your stack", "text": "Use the Checker to surface overlaps or timing clashes." },
          { "@type": "HowToStep", "name": "Export", "text": "Download an .ics calendar file or copy the plan text." }
        ]
      },
      {
        "@type": "ItemList",
        "name": "SuppPlanner Services",
        "itemListElement": [
          {
            "@type": "Service",
            "name": "Supplement Planner",
            "serviceType": "Supplement planning",
            "provider": { "@type": "Organization", "name": "SuppPlanner" },
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "areaServed": "Worldwide"
          },
          {
            "@type": "Service",
            "name": "Stack Checker",
            "serviceType": "Supplement stack checker",
            "provider": { "@type": "Organization", "name": "SuppPlanner" },
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "areaServed": "Worldwide"
          }
        ]
      }
    ]
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Build a simple, clear supplement plan
          </h1>
          <p className="mt-3 text-gray-700">
            Two tools: create a weekly SuppPlan or sanity-check your current stack — totally free.
          </p>

          {/* BIG CTAs (accessible labels + stronger hover/focus) */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/planner"
              aria-label="Create new SuppPlan – open the Planner"
              className="btn btn-primary btn-lg gap-2 btn-raise"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 4h6a2 2 0 0 1 2 2v1h-2.5a1.5 1.5 0 1 0-3 0H9V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="5" y="6" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 11h8M8 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Create new SuppPlan
            </Link>

            <Link
              href="/check"
              aria-label="Check my stack – open the Checker"
              className="btn btn-outline btn-lg gap-2 btn-raise"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Check my stack
            </Link>
          </div>

          {/* HOW IT WORKS (free) with consistent link text */}
          <div className="mt-8 space-y-3">
            <h2 className="text-lg font-semibold">How it works (free)</h2>
            <ul className="text-gray-800 list-disc pl-5 space-y-1">
              <li>
                <strong>Planner</strong> suggests a weekly schedule using only items from our Library.
                Start here: <Link href="/planner" className="underline">Create new SuppPlan</Link>.
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

        {/* Comic image (descriptive alt is in the component) */}
        <HeroComic />
      </section>

      {/* RICH SEO TEXT (kept above the fold content clean; still high on page) */}
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

      {/* FAQ (use semantic headings for hierarchy) */}
      <section className="mt-16">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <article className="card p-4">
            <h3 className="font-medium">What does SuppPlanner do?</h3>
            <p className="text-gray-700 mt-1">
              It helps you draft a simple weekly plan and review an existing stack with clear, conservative tips — for free.
            </p>
          </article>
          <article className="card p-4">
            <h3 className="font-medium">Is SuppPlanner free?</h3>
            <p className="text-gray-700 mt-1">
              Yes. The Planner, Checker, and Library are free to use.
            </p>
          </article>
          <article className="card p-4">
            <h3 className="font-medium">Where does the info come from?</h3>
            <p className="text-gray-700 mt-1">
              Our dataset of common ingredients with timing notes and typical ranges. We keep entries short and practical.
            </p>
          </article>
          <article className="card p-4">
            <h3 className="font-medium">Can I share my plan?</h3>
            <p className="text-gray-700 mt-1">Yes — export to .ics or copy the schedule text to share.</p>
          </article>
        </div>
      </section>

      {/* Move Ad lower to avoid disrupting the tool flow (per feedback) */}
      <section className="mt-12">
        <div className="card p-4">
          <AdSlot height={250} />
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
