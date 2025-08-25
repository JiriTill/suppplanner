// lib/metrics.ts
type Tool = 'planner' | 'checker';

const PREFIX = 'suppplanner:uses';

function upstash() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

async function redisGET(key: string): Promise<number | null> {
  const env = upstash();
  if (!env) return null;
  const res = await fetch(`${env.url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${env.token}` },
    cache: 'no-store', // force dynamic
  });
  if (!res.ok) return null;
  const json = await res.json().catch(() => null);
  const raw = json?.result;
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}

async function redisINCR(key: string): Promise<number | null> {
  const env = upstash();
  if (!env) return null;
  // Upstash REST single-command endpoint:
  const res = await fetch(`${env.url}/incr/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${env.token}` },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const json = await res.json().catch(() => null);
  const n = Number(json?.result);
  return Number.isFinite(n) ? n : null;
}

export async function incrementTool(tool: Tool): Promise<number | null> {
  return redisINCR(`${PREFIX}:${tool}`);
}

export async function getCounts(): Promise<{
  planner: number;
  checker: number;
  total: number;
}> {
  const [p, c] = await Promise.all([
    redisGET(`${PREFIX}:planner`),
    redisGET(`${PREFIX}:checker`),
  ]);
  const planner = p ?? 0;
  const checker = c ?? 0;
  return { planner, checker, total: planner + checker };
}

