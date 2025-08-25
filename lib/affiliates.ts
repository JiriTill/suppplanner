import path from 'node:path';
import fs from 'node:fs/promises';


const dataDir = path.join(process.cwd(), 'data');


export async function resolveAffiliate(slug: string, region: 'EU'|'US'|'UK'|'Other') {
const p = path.join(dataDir, 'affiliates.json');
const raw = await fs.readFile(p, 'utf-8');
const map = JSON.parse(raw);
const key = slug;
const r = region.toLowerCase();
return map[key]?.[r] || [];
}
