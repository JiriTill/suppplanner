import { getAllGoals, getIngredientsForGoal, getULTable } from './data';
import type { Ingredient } from './types';


// Choose a small set of ingredients for the AI to arrange. Conservative, rule-based.
export async function selectIngredientsForUser(body: any, mode: 'plan'|'check') {
const { goals = [], diet, allergies = '', medical = '', meds = '', pregnancy = 'n/a', country = 'EU' } = body || {};
const ul = await getULTable();
const selected: Ingredient[] = [];


if (mode === 'plan') {
const goalSlugs = await getGoalSlugs(goals);
// For each goal, pick up to 2 well-tolerated ingredients with evidence A/B
for (const g of goalSlugs) {
const candidates = await getIngredientsForGoal(g);
const good = candidates.filter(c => ['A','B'].includes(c.goals[g]?.evidence));
for (const c of good.slice(0, 2)) {
if (!selected.find(x=>x.slug===c.slug)) selected.push(c);
}
}
}


// In check mode we don’t pick; we only pass context
return { mode, region: country, ul, selection: selected, user: { goals, diet, allergies, medical, meds, pregnancy } };
}


async function getGoalSlugs(goals: string[]): Promise<string[]> {
const all = await getAllGoals();
const norm = (s: string) => s.toLowerCase().replace(/[^a-z]+/g,'-');
const desired = new Set(goals.map(norm));
const out: string[] = [];
for (const g of all) if (desired.has(g.slug)) out.push(g.slug);
return out;
}


export function buildContextForAI(shortlist: any, body: any, mode: 'plan'|'check') {
const { selection, ul, user, region } = shortlist;


if (mode === 'check') {
const stack = (body?.currentStack || '').slice(0, 4000);
return `User region: ${region}. Pregnancy: ${user.pregnancy}. Medical: ${user.medical}. Meds: ${user.meds}. Allergies: ${user.allergies}.
Check this stack for duplicates/overlaps and general considerations (educational only):\n${stack}\nReturn JSON as specified.`;
}


const items = selection.map((i: any) => ({ slug: i.slug, title: i.title, goals: i.goals, timing: i.timing, ul: i.ul }));
return `User region: ${region}. Goals: ${user.goals?.join(', ')}. Diet: ${user.diet}. Pregnancy: ${user.pregnancy}. Medical: ${user.medical}. Meds: ${user.meds}. Allergies: ${user.allergies}.
Use ONLY these ingredients (no others): ${JSON.stringify(items)}.
Respect ULs and be conservative. Arrange into a weekly plan and daily schedule. Add warnings when relevant. Return JSON ONLY with the required keys.`;
}
