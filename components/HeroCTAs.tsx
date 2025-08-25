'use client';
import Link from 'next/link';

function track(name: string) {
  try { (window as any)?.plausible?.(name); } catch {}
}

async function pingUse() {
  try { await fetch('/api/metrics/use', { method: 'POST', keepalive: true }); } catch {}
}

export default function HeroCTAs() {
  const plannerClick = async () => { track('hero_cta_planner'); await pingUse(); };
  const checkerClick = async () => { track('hero_cta_checker'); await pingUse(); };

  return (
    <>
      <div className="mt-4 flex items-center gap-3">
        <span className="badge">Free — no signup required</span>
      </div>
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <Link
          href="/planner"
          aria-label="Create new SuppPlan – open the Planner"
          prefetch={false}
          onClick={plannerClick}
          className="btn btn-primary btn-xl gap-2 btn-raise"
        >
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
          onClick={checkerClick}
          className="text-primary underline underline-offset-4"
        >
          Check my stack →
        </Link>
      </div>
    </>
  );
}

