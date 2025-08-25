import { getSummary } from '@/lib/metrics';

export const runtime = 'nodejs';

export async function GET() {
  const data = await getSummary();
  return Response.json(data);
}
