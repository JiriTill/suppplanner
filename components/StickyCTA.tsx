'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function track(name: string) { try { (window as any)?.plausible?.(name); } catch {} }
async function pingUse() { try { await fetch('/api/metrics/use', { method: 'POST', keepalive: true }); } catch {} }

export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  const handleClick = async () => { track('sticky_cta_click'); await pingUse(); };

  return (
    <div className="fixed inset-x-0 bottom-3 z-50 flex justify-center sm:hidden">
      <div className="mx-3 w-full max-w-sm rounded-2xl border bg-white shadow">
        <div className="p-3 flex items-center justify-between gap-3">
          <div className="text-sm">
            <div className="font-semibold">Build your plan</div>
            <div className="text-gray-600">Free — no signup</div>
          </div>
          <Link
            href="/planner"
            prefetch={false}
            onClick={handleClick}
            className="btn btn-primary px-4 py-2"
          >
            Create Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
