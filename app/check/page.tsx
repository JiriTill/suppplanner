'use client';
import React, { useState } from 'react';
import SEO from '@/components/SEO';


export default function CheckPage() {
const [list, setList] = useState('Vitamin D3 2000 IU\nMagnesium 200 mg');
const [result, setResult] = useState<string | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);


async function handleCheck(e: React.FormEvent) {
e.preventDefault();
setLoading(true); setError(null); setResult(null);
try {
const resp = await fetch('/api/planner', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ mode: 'check', currentStack: list })
});
if (!resp.ok) throw new Error(await resp.text());
const data = await resp.json();
setResult(JSON.stringify(data, null, 2));
} catch (e: any) { setError(e.message); }
finally { setLoading(false); }
}


return (
<div className="space-y-4">
<SEO title="Check My Supplement Stack" description="Paste your current supplements and get a safety-oriented review with potential overlaps and suggestions." />
<h1 className="text-3xl font-bold text-primary">Check My Current Stack</h1>
<form onSubmit={handleCheck} className="bg-white p-4 rounded-xl shadow space-y-3">
<label className="block">
<span className="text-sm">Paste your current supplements (one per line)</span>
<textarea className="mt-1 w-full border rounded-md p-2" rows={8} value={list} onChange={e=>setList(e.target.value)} />
</label>
<button className="bg-primary text-white px-4 py-2 rounded-lg" disabled={loading}>{loading ? 'Checking…' : 'Check'}</button>
{error && <div className="text-red-600 text-sm">{error}</div>}
</form>
{result && (
<pre className="bg-black text-white p-4 rounded-xl overflow-auto text-sm">{result}</pre>
)}
</div>
);
}
