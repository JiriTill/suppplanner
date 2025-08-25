'use client';
import EmailCapture from './EmailCapture';


export default function PlanResult({ plan }: { plan: any }) {
async function downloadICS() {
const r = await fetch('/api/ics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(plan) });
const blob = await r.blob();
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url; a.download = 'suppplan.ics'; a.click();
URL.revokeObjectURL(url);
}


return (
<div className="bg-white p-6 rounded-2xl shadow space-y-4">
<div className="flex items-center justify-between">
<h2 className="text-2xl font-bold">Your Plan</h2>
<button onClick={downloadICS} className="px-3 py-2 rounded-lg border">Download .ics</button>
</div>
<p className="text-gray-700 whitespace-pre-wrap">{plan.summary}</p>


{plan.warnings?.length > 0 && (
<section>
<h3 className="font-semibold text-red-600 mb-2">Warnings</h3>
<ul className="list-disc pl-5 text-red-700 space-y-1">{plan.warnings.map((w: string, i: number) => <li key={i}>{w}</li>)}</ul>
</section>
)}


{plan.interactions?.length > 0 && (
<section>
<h3 className="font-semibold mb-2">Potential Interactions</h3>
<ul className="list-disc pl-5 space-y-1">{plan.interactions.map((w: string, i: number) => <li key={i}>{w}</li>)}</ul>
</section>
)}


<section>
<h3 className="font-semibold mb-2">Daily Schedule</h3>
<div className="grid md:grid-cols-3 gap-3">
<div><div className="font-medium mb-1">Morning</div><ul className="list-disc pl-5 space-y-1">{(plan.schedule?.morning||[]).map((x: string, i: number) => <li key={i}>{x}</li>)}</ul></div>
<div><div className="font-medium mb-1">Midday</div><ul className="list-disc pl-5 space-y-1">{(plan.schedule?.midday||[]).map((x: string, i: number) => <li key={i}>{x}</li>)}</ul></div>
<div><div className="font-medium mb-1">Evening</div><ul className="list-disc pl-5 space-y-1">{(plan.schedule?.evening||[]).map((x: string, i: number) => <li key={i}>{x}</li>)}</ul></div>
</div>
</section>


<section>
<h3 className="font-semibold mb-2">Weekly Plan</h3>
<div className="grid md:grid-cols-2 gap-3">
{(plan.weekly||[]).map((d: any, i: number) => (
<div key={i} className="border rounded-xl p-3"><div className="font-medium">{d.day}</div><ul className="list-disc pl-5 space-y-1">{d.items.map((x: string, j: number) => <li key={j}>{x}</li>)}</ul></div>
))}
</div>
</section>


<section>
<h3 className="font-semibold mb-2">Shopping List</h3>
<ul className="list-disc pl-5 space-y-1">{(plan.shoppingList||[]).map((x: string, i: number)=> <li key={i}>{x}</li>)}</ul>
</section>


<div className="pt-2 border-t">
<EmailCapture />
<p className="text-xs text-gray-500 mt-2">Educational use only. Not medical advice.</p>
</div>
</div>
);
}
