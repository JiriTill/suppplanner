'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const LinkItem = ({ href, label }: { href: string; label: string }) => {
const pathname = usePathname();
const active = pathname === href;
return (
<Link href={href} className={`px-3 py-2 rounded-lg hover:bg-gray-100 ${active ? 'font-bold text-primary' : 'text-gray-700'}`}>
{label}
</Link>
);
};


export default function Header() {
return (
<header className="bg-white border-b">
<div className="container h-16 flex items-center justify-between">
<Link href="/" className="font-extrabold text-xl text-primary">SuppPlan</Link>
<nav className="flex items-center gap-2">
<LinkItem href="/planner" label="Planner" />
<LinkItem href="/check" label="Check" />
<LinkItem href="/library" label="Library" />
<LinkItem href="/blog" label="Blog" />
<LinkItem href="/contact" label="Contact" />
</nav>
</div>
</header>
);
}
