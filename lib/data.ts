import fs from 'node:fs/promises';
import type { Ingredient } from './types';


const dataDir = path.join(process.cwd(), 'data');


export async function getAllIngredientSlugs(): Promise<string[]> {
const dir = path.join(dataDir, 'ingredients');
const files = await fs.readdir(dir);
return files.filter(f=>f.endsWith('.json')).map(f=>f.replace(/\.json$/,''));
}


export async function getIngredientBySlug(slug: string): Promise<Ingredient> {
const p = path.join(dataDir, 'ingredients', `${slug}.json`);
const raw = await fs.readFile(p, 'utf-8');
const json = JSON.parse(raw);
return json as Ingredient;
}


export async function getAllIngredientSummaries(): Promise<{ slug: string; title: string; snippet: string }[]> {
const slugs = await getAllIngredientSlugs();
const list: { slug: string; title: string; snippet: string }[] = [];
for (const s of slugs) {
const ing = await getIngredientBySlug(s);
list.push({ slug: s, title: ing.title, snippet: ing.summary.slice(0, 140) + (ing.summary.length>140?'…':'') });
}
return list.sort((a,b)=> a.title.localeCompare(b.title));
}


export async function getAllGoals(): Promise<{ slug: string; name: string }[]> {
const p = path.join(dataDir, 'goals.json');
const raw = await fs.readFile(p, 'utf-8');
const json = JSON.parse(raw);
return json;
}


export async function getGoalBySlug(slug: string): Promise<{ slug: string; name: string }> {
const goals = await getAllGoals();
const g = goals.find(x=>x.slug===slug);
if (!g) throw new Error('Goal not found');
return g;
}


export async function getIngredientsForGoal(goalSlug: string): Promise<Ingredient[]> {
const slugs = await getAllIngredientSlugs();
const out: Ingredient[] = [];
for (const s of slugs) {
const ing = await getIngredientBySlug(s);
if (ing.goals[goalSlug]) out.push(ing);
}
return out;
}


export async function getAllGoalSlugs(): Promise<string[]> { const g = await getAllGoals(); return g.map(x=>x.slug); }


export async function getULTable(): Promise<Record<string, any>> {
const p = path.join(dataDir, 'ul.json');
const raw = await fs.readFile(p, 'utf-8');
return JSON.parse(raw);
}
