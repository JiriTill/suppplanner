import Link from 'next/link';
import SEO from '@/components/SEO';


export default function HomePage() {
return (
<div className="space-y-6">
<SEO title="SuppPlan – Simple supplement planning" description="Generate a safe, structured weekly supplement plan. Check your current stack for overlaps and interactions." />
<section className="bg-white p-6 rounded-2xl shadow">
<h1 className="text-3xl font-bold text-primary">SuppPlan</h1>
<p className="mt-2 text-gray-700">Generate a safe, structured weekly supplement plan tailored to your goals—and check your current stack for potential issues.</p>
<div className="mt-4 flex gap-3">
<Link href="/planner" className="bg-primary text-white px-4 py-2 rounded-lg">Open Planner</Link>
<Link href="/check" className="px-4 py-2 rounded-lg border">Check My Stack</Link>
</div>
</section>
</div>
);
}
