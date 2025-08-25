import Link from 'next/link';
import Image from 'next/image';
import KofiButton from '@/components/KofiButton';

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-[#eaf6ef]">

      <div className="mx-auto max-w-5xl px-4 py-10 grid md:grid-cols-12 gap-6 text-sm">
        {/* Left: logo + brand */}
        <div className="md:col-span-4">
          <Link href="/" className="flex items-start gap-3 group">
            <Image src="/logo192.png" alt="SuppPlanner logo" width={44} height={44} />
            <div className="flex flex-col">
              <span className="font-semibold text-base group-hover:underline">SuppPlanner</span>
              <span className="text-gray-700">Plan clearer. Keep it simple.</span>
            </div>
          </Link>
        </div>

        <div className="md:col-span-4 md:col-start-5 w-full md:max-w-md justify-self-center">
          <div className="card p-4 text-center">
            <div className="font-medium">Support our work so it can stay free.</div>
            <div className="mt-3 flex justify-center">
              <KofiButton />
            </div>
          </div>
        </div>

        <div className="md:col-span-3 md:col-start-10 md:justify-self-end w-full max-w-[240px]">
          <div className="grid grid-cols-2 gap-4 md:text-sm text-sm md:text-right">
            <div className="space-y-0.5">
              <div className="font-semibold">Site</div>
              <ul className="space-y-0.5">
                <li><Link className="hover:underline" href="/planner">Planner</Link></li>
                <li><Link className="hover:underline" href="/check">Check</Link></li>
                <li><Link className="hover:underline" href="/library">Library</Link></li>
                <li><Link className="hover:underline" href="/blog">Blog</Link></li>
              </ul>
            </div>
            <div className="space-y-0.5">
              <div className="font-semibold">Legal</div>
              <ul className="space-y-0.5">
                <li><Link className="hover:underline" href="/terms">Terms</Link></li>
                <li><Link className="hover:underline" href="/data-usage">Data Usage</Link></li>
                <li><Link className="hover:underline" href="/affiliate-disclosure">Disclosure</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pb-8">© {new Date().getFullYear()} SuppPlanner</div>
    </footer>
  );
}
