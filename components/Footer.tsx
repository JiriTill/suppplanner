import Link from 'next/link';
import Image from 'next/image';
import KofiButton from '@/components/KofiButton';

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-[#eaf6ef]">
      <div className="mx-auto max-w-5xl px-4 py-10 grid md:grid-cols-3 gap-8 text-sm">
        {/* Left: logo + brand + catchphrase */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Image src="/logo192.png" alt="SuppPlanner logo" width={40} height={40} />
            <div className="font-semibold text-base">SuppPlanner</div>
          </div>
          <p className="text-gray-700">Plan clearer. Keep it simple.</p>
        </div>

        {/* Middle: Ko-Fi support box */}
        <div className="card p-4 text-center">
          <div className="font-medium">Support our work so it can stay free</div>
          <p className="text-gray-700 mt-1">If this helped you, a coffee keeps the lights on ☕</p>
          <div className="mt-3 flex justify-center">
            <KofiButton />
          </div>
        </div>

        {/* Right: links */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <div className="font-semibold">Site</div>
            <ul className="space-y-1">
              <li><Link className="hover:underline" href="/planner">Planner</Link></li>
              <li><Link className="hover:underline" href="/check">Check</Link></li>
              <li><Link className="hover:underline" href="/library">Library</Link></li>
              <li><Link className="hover:underline" href="/blog">Blog</Link></li>
            </ul>
          </div>
          <div className="space-y-1">
            <div className="font-semibold">Legal</div>
            <ul className="space-y-1">
              <li><Link className="hover:underline" href="/terms">Terms</Link></li>
              <li><Link className="hover:underline" href="/data-usage">Data Usage</Link></li>
              <li><Link className="hover:underline" href="/affiliate-disclosure">Disclosure</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pb-8">© {new Date().getFullYear()} SuppPlanner</div>
    </footer>
  );
}
