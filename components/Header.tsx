import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="SuppPlanner home">
          <Image src="/logo512.png" alt="SuppPlanner logo" width={28} height={28} />
          <span className="font-semibold text-lg tracking-tight text-primary">SuppPlanner</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/planner" className="hover:underline">Planner</Link>
          <Link href="/check" className="hover:underline">Check</Link>
          <Link href="/library" className="hover:underline">Library</Link>
          <Link href="/blog" className="hover:underline">Blog</Link>
        </nav>
      </div>
    </header>
  );
}
