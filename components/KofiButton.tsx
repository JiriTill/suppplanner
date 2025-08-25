'use client';
import React from 'react';


export default function KofiButton({ label = 'Support on Ko‑fi' }: { label?: string }) {
const id = process.env.NEXT_PUBLIC_KOFI_ID || '';
const href = id ? `https://ko-fi.com/${id}` : 'https://ko-fi.com/';
return (
<a href={href} target="_blank" rel="noreferrer"
className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700 shadow">
<span>☕</span>
<span>{label}</span>
</a>
);
}
