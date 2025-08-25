'use client';
import { useEffect, useState } from 'react';

export default function SocialProof() {
  const seed = Number(process.env.NEXT_PUBLIC_USER_COUNT_SEED || 120);
  const [count, setCount] = useState<number>(seed);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/metrics/summary', { cache: 'no-store' });
        const json = await res.json();
        if (mounted && typeof json.totalUses === 'number') setCount(json.totalUses);
      } catch {}
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="card p-4 flex items-center justify-between">
      <div className="text-sm text-gray-700">Trusted by health-conscious people worldwide</div>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-semibold">{count.toLocaleString()}</div>
        <div className="text-sm text-gray-600">plans & checks created</div>
      </div>
    </div>
  );
}
