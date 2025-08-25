// app/api/metrics/use/route.ts
import { incrementTool } from '@/lib/metrics';

export async function POST(req: Request) {
  // allow body or query (?tool=planner)
  let tool = new URL(req.url).searchParams.get('tool') as
    | 'planner'
    | 'checker'
    | null;

  if (!tool) {
    const ct = req.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      const body = await req.json().catch(() => null as any);
      tool = body?.tool;
    }
  }

  if (tool !== 'planner' && tool !== 'checker') {
    return new Response('Bad tool', { status: 400 });
  }

  const value = await incrementTool(tool);
  return Response.json({ ok: value !== null, tool, value });
}
