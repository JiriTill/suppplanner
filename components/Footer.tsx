import Link from 'next/link';
import KofiButton from '@/components/KofiButton';

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-5xl px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
        <div className="space-y-2">
          <div className="font-semibold">SuppPlanner</div>
          <p className="text-gray-600">Educational only. Not medical advice. Affiliate-free for now.</p>
          <KofiButton />
        </div>
        <div className="space-y-1">
          <div className="font-semibold">Site</div>
          <ul className="space-y-1">
            <li><Link className="hover:underline" href="/library">Library</Link></li>
            <li><Link className="hover:underline" href="/planner">Planner</Link></li>
            <li><Link className="hover:underline" href="/check">Check</Link></li>
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
      <div className="text-center text-xs text-gray-500 pb-8">© {new Date().getFullYear()} SuppPlanner</div>
    </footer>
  );
}
