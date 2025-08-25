import Link from 'next/link';


export default function Footer() {
return (
<footer className="bg-white border-t mt-8">
<div className="container py-6 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-2">
<div>© {new Date().getFullYear()} SuppPlan</div>
<div className="flex gap-4">
<Link href="/terms" className="hover:underline">Terms</Link>
<Link href="/data-usage" className="hover:underline">Data Usage</Link>
<a href="https://neoantica.com" target="_blank" rel="noreferrer" className="hover:underline">Neoantica</a>
</div>
</div>
</footer>
);
}
