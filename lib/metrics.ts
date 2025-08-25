const KEY = 'suppplanner:total_uses';

// Prefer Vercel KV if configured, else Upstash REST, else fallback to seed
function kvEnv() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}
function upstashEnv() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

export async function incrementUses(by = 1): Promise<number> {
  // Vercel KV (Upstash-compatible REST)
  const kv = kvEnv();
  if (kv) {
    try {
      const res = await fetch(`${kv.url}/incrby/${encodeURIComponent(KEY)}/${by}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${kv.token}` },
        cache: 'no-store',
      });
      const json = await res.json();
      if (typeof json.result === 'number') return json.result;
    } catch {}
  }
  // Upstash REST
  const up = upstashEnv();
  if (up) {
    try {
      const res = await fetch(`${up.url}/incrby/${encodeURIComponent(KEY)}/${by}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${up.token}` },
        cache: 'no-store',
      });
      const json = await res.json();
      if (typeof json.result === 'number') return json.result;
    } catch {}
  }
  // Fallback: return seed (not persisted)
  const seed = Number(process.env.NEXT_PUBLIC_USER_COUNT_SEED || 120);
  return seed;
}

export async function getSummary(): Promise<{ totalUses: number }> {
  // Vercel KV
  const kv = kvEnv();
  if (kv) {
    try {
      const res = await fetch(`${kv.url}/get/${encodeURIComponent(KEY)}`, {
        headers: { Authorization: `Bearer ${kv.token}` },
        cache: 'no-store',
      });
      const json = await res.json();
      const val = Number(json.result ?? 0);
      return { totalUses: Number.isFinite(val) ? val : Number(process.env.NEXT_PUBLIC_USER_COUNT_SEED || 120) };
    } catch {}
  }
  // Upstash REST
  const up = upstashEnv();
  if (up) {
    try {
      const res = await fetch(`${up.url}/get/${encodeURIComponent(KEY)}`, {
        headers: { Authorization: `Bearer ${up.token}` },
        cache: 'no-store',
      });
      const json = await res.json();
      const val = Number(json.result ?? 0);
      return { totalUses: Number.isFinite(val) ? val : Number(process.env.NEXT_PUBLIC_USER_COUNT_SEED || 120) };
    } catch {}
  }
  // Fallback seed only
  return { totalUses: Number(process.env.NEXT_PUBLIC_USER_COUNT_SEED || 120) };
}
