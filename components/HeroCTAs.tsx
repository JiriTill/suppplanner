'use client';
import Link from 'next/link';

function track(name: string) {
  try { (window as any)?.plausible?.(name); } catch {}
}

async function pingUse(tool: 'planner' | 'checker') {
  try { await fetch(`/api/metrics/use?tool=${tool}`, { method: 'POST', keepalive: true }); } catch {}
}

export default function HeroCTAs() {
  const plannerClick = async () => { track('hero_cta_planner'); await pingUse('planner'); };
  const checkerClick = async () => { track('hero_cta_checker'); await pingUse('checker'); };

  return (
    <>
      <div className="mt-4 flex items-center gap-3">
        <span className="badge">Free — no signup required</span>
      </div>
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <Link
          href="/planner"
          prefetch={false}
          onClick={plannerClick}
          className="btn btn-primary btn-xl gap-2 btn-raise"
          aria-label="Create new SuppPlan – open the Planner"
        >
          {/* …icon… */}
          Create new SuppPlan
        </Link>

        <Link
          href="/check"
          prefetch={false}
          onClick={checkerClick}
          className="text-primary underline underline-offset-4"
          aria-label="Check my stack – open the Checker"
        >
          Check my stack →
        </Link>
      </div>
    </>
  );
}
