'use client';
import { useState } from 'react';


export default function EmailCapture() {
const [email, setEmail] = useState('');
const [ok, setOk] = useState(false);
const [err, setErr] = useState<string | null>(null);


async function submit(e: React.FormEvent) {
e.preventDefault(); setErr(null);
const r = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
if (r.ok) setOk(true); else setErr(await r.text());
}


if (ok) return <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-lg">Check your inbox to confirm your subscription.</div>;


return (
<form onSubmit={submit} className="flex gap-2">
<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email for updates & PDF" className="flex-1 border rounded-md px-3 py-2" />
<button className="bg-primary text-white px-4 py-2 rounded-lg">Subscribe</button>
{err && <div className="text-red-600 text-sm">{err}</div>}
</form>
);
}
