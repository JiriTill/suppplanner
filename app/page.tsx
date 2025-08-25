import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import HeroComic from '@/components/HeroComic';
import { getLatestPosts } from '@/lib/blog';
import SocialProof from '@/components/SocialProof';
import TrustBadges from '@/components/TrustBadges';
import ToolPreview from '@/components/ToolPreview';
import FAQAccordion from '@/components/FAQAccordion';
import HeroCTAs from '@/components/HeroCTAs';

export default async function HomePage() {
  const posts = await getLatestPosts(3);

  // JSON-LD: FAQ, HowTo, Services, SoftwareApplication
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What does SuppPlanner do?",
            "acceptedAnswer": { "@type": "Answer", "text": "It helps you draft a simple weekly plan and review an existing stack with clear, conservative tips — for free." } },
          { "@type": "Question", "name": "Is SuppPlanner free?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. The Planner, Checker, and Library are free to use." } },
          { "@type": "Question", "name": "Where does the info come from?",
            "acceptedAnswer": { "@type": "Answer", "text": "From our curated dataset of common ingredients with timing notes and typical ranges." } },
          { "@type": "Question", "name": "Can I share my plan?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes — export to a calendar file (.ics) or copy the schedule text." } }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to create a simple supplement plan",
        "step": [
          { "@type": "HowToStep", "name": "Open Planner" },
          { "@type": "HowToStep", "name": "Pick goals" },
          { "@type": "HowToStep", "name": "Review the schedule" },
          { "@type": "HowToStep", "name": "Check your stack" },
          { "@type": "HowToStep", "name": "Export" }
        ]
      },
      {
        "@type": "ItemList",
        "name": "SuppPlanner Services",
        "itemListElement": [
          { "@type": "Service", "name": "Supplement Planner", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } },
          { "@type": "Service", "name": "Stack Checker", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": "SuppPlanner",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    ]
  };

  // CTA click ping (adds to combined count) – fire-and-forget
  async function pingUse() {
    try { await fetch('/api/metrics/use', { method: 'POST', keepalive: true }); } catch {}
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Stop guessing supplements. Get a science-based weekly plan in minutes.
          </h1>
          <p className="mt-3 text-gray-700">
            Create a personalized schedule and check your stack for overlaps — free and fast.
          </p>

          <HeroCTAs />
          
              {/* clipboard icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none">
                <path d="M9 4h6a2 2 0 0 1 2 2v1h-2.5a1.5 1.5 0 1 0-3 0H9V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="5" y="6" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 11h8M8 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Create new SuppPlan
            </Link>
            <Link
              href="/check"
              aria-label="Check my stack – open the Checker"
              prefetch={false}
              onClick={pingUse}
              className="text-primary underline underline-offset-4"
            >
              Check my stack →
            </Link>
          </div>

          <div className="mt-6">
            <TrustBadges />
          </div>
        </div>

        {/* Keep the comic for now (we can swap later) */}
        <HeroComic />
      </section>

      {/* Social proof bar */}
      <div className="mt-10">
        <SocialProof />
      </div>

      {/* HOW IT WORKS – numbered cards */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">How it works (free)</h2>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {[
            { n: 1, title: 'Open Planner', desc: 'Start a new SuppPlan from our ingredient Library.' },
            { n: 2, title: 'Pick goals', desc: 'Choose 1–2 goals to keep your plan focused.' },
            { n: 3, title: 'Review & export', desc: 'Check overlaps, then export to your calendar.' },
          ].map(step => (
            <div key={step.n} className="card p-4">
              <div className="text-primary font-semibold">Step {step.n}</div>
              <h3 className="mt-1 font-semibold">{step.title}</h3>
              <p className="text-gray-700 mt-1 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm">
          Start here: <Link href="/planner" className="underline">Create new SuppPlan</Link> · Or <Link href="/check" className="underline">Check my stack</Link>
        </div>
      </section>

      {/* Tool Previews (sample output UI) */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">See what you get</h2>
        <ToolPreview />
      </section>

      {/* Rich SEO text stays */}
      <section className="mt-12 prose max-w-none">
        <h2>Free supplement planner, stack checker, and ingredient library</h2>
        <p>
          SuppPlanner is a free <strong>supplement planner</strong> and <strong>stack checker</strong> designed to help you
          create a clear, weekly <strong>supplement plan</strong> and review your current stack for overlaps. The Planner
          only draws from our <strong>supplement library</strong> so recommendations stay consistent with our data on timing,
          typical ranges, and conservative heuristics around <strong>upper intake limits (ULs)</strong>.
        </p>
        <ul>
          <li><Link href="/planner">Supplement Planner</Link> — build a weekly schedule from curated ingredients.</li>
          <li><Link href="/check">Stack Checker</Link> — surface potential overlaps or timing conflicts.</li>
          <li><Link href="/library">Supplement Library</Link> — quick references for common ingredients.</li>
        </ul>
      </section>

      {/* FAQ (accordion) */}
      <section className="mt-16">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <FAQAccordion />
      </section>

      {/* Ad lower on page */}
      <section className="mt-12">
        <div className="card p-4">
          <AdSlot height={250} />
        </div>
      </section>

      {/* Blog */}
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

      {/* Prominent disclaimer */}
      <section className="mt-12 text-xs text-gray-600">
        <p><strong>Disclaimer:</strong> Educational use only. Not medical advice. Always consider your personal situation and medications with a qualified clinician.</p>
      </section>
    </main>
  );
}
