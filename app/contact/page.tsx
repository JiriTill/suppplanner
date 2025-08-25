'use client';
import { useState } from 'react';


export default function ContactPage() {
const [email, setEmail] = useState('');
const [msg, setMsg] = useState('');
const [ok, setOk] = useState(false);


return (
<div className="max-w-xl">
<h1 className="text-3xl font-bold text-primary mb-4">Contact</h1>
{ok ? (
<div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-lg">Thanks! We will get back to you.</div>
) : (
<form onSubmit={(e)=>{e.preventDefault(); setOk(true);}} className="bg-white p-6 rounded-2xl shadow space-y-3">
<label className="block">
<span className="text-sm">Email</span>
<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />
</label>
<label className="block">
<span className="text-sm">Message</span>
<textarea required rows={4} value={msg} onChange={e=>setMsg(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2"></textarea>
</label>
<button className="bg-primary text-white px-4 py-2 rounded-lg">Send</button>
</form>
)}
</div>
);
}
