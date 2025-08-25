import { incrementUses } from '@/lib/metrics';

export const runtime = 'nodejs';

export async function POST() {
  try {
    const total = await incrementUses(1);
    return Response.json({ ok: true, total });
  } catch (e) {
    return Response.json({ ok: false }, { status: 200 });
  }
}
