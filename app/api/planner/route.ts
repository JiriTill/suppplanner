import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { selectIngredientsForUser, buildContextForAI } from '@/lib/rules';


export const runtime = 'nodejs';


const SYSTEM = `You are a careful, conservative supplement planning assistant.
- Output *only* JSON. No markdown, no prose around it.
- Keys: {summary, warnings[], interactions[], schedule:{morning[],midday[],evening[]}, weekly:[{day,items[]}], shoppingList[]}.
- Use user-provided context and the provided ingredient shortlist. Do not invent new ingredients.
- Add safety notes when pregnancy, meds, or contradictions appear. Encourage consulting a clinician.`;


export async function POST(req: Request) {
try {
const body = await req.json();
const mode: 'plan' | 'check' = body?.mode === 'check' ? 'check' : 'plan';


// Select dataset-backed ingredients + rules first
const shortlist = await selectIngredientsForUser(body, mode);
const aiContext = buildContextForAI(shortlist, body, mode);


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const resp = await openai.responses.create({
model: 'gpt-4o-mini',
temperature: 0.4,
input: [
{ role: 'system', content: SYSTEM },
{ role: 'user', content: aiContext }
]
});


const text = resp.output_text?.trim() || '{}';
const jsonText = text.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
const data = JSON.parse(jsonText || '{}');


return NextResponse.json(data);
} catch (err: any) {
return new NextResponse(`Planner error: ${err?.message || 'unknown'}`, { status: 500 });
}
}
