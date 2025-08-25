// components/SocialProof.tsx
import { getCounts } from '@/lib/metrics';

export default async function SocialProof() {
  const { total, planner, checker } = await getCounts(); // dynamic, no-store

  return (
    <div className="card p-4 flex flex-wrap items-center gap-4">
      <div className="text-2xl font-semibold">{(total || 0).toLocaleString()}+</div>
      <div className="text-gray-700">
        plans & checks created · {planner.toLocaleString()} plans · {checker.toLocaleString()} checks
      </div>
    </div>
  );
}
