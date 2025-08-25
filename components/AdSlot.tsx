'use client';
import { useEffect } from 'react';

declare global { interface Window { adsbygoogle: any[] } }

export default function AdSlot({
  slot,
  style = {},
  height = 160, // controls placeholder height
}: {
  slot?: string;
  style?: React.CSSProperties;
  height?: number;
}) {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
  }, []);

  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) {
    return (
      <div
        className="border rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-600 flex items-center justify-center"
        style={{ minHeight: height, ...style }}
      >
        Ad placeholder (set NEXT_PUBLIC_ADSENSE_CLIENT to enable)
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client={client}
      data-ad-slot={slot || 'auto'}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
