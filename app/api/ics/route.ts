import { NextResponse } from 'next/server';


export async function POST(req: Request) {
try {
const plan = await req.json();
const now = new Date();
const y = now.getUTCFullYear();
const m = String(now.getUTCMonth()+1).padStart(2,'0');
const d = String(now.getUTCDate()).padStart(2,'0');


// Create a simple ICS for next 7 days based on plan.schedule
const lines: string[] = [
'BEGIN:VCALENDAR',
'VERSION:2.0',
'PRODID:-//SuppPlan//ICS 1.0//EN'
];


const blocks = [
['Morning', plan?.schedule?.morning || [], '08:00:00Z'],
['Midday', plan?.schedule?.midday || [], '12:00:00Z'],
['Evening', plan?.schedule?.evening || [], '19:00:00Z']
];


for (let i=0; i<7; i++) {
const day = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()+i));
const date = `${day.getUTCFullYear()}${String(day.getUTCMonth()+1).padStart(2,'0')}${String(day.getUTCDate()).padStart(2,'0')}`;
for (const [label, items, time] of blocks as any[]) {
if (!items || items.length === 0) continue;
lines.push('BEGIN:VEVENT');
lines.push(`UID:${date}-${label}@suppplan`);
lines.push(`DTSTAMP:${y}${m}${d}T000000Z`);
lines.push(`DTSTART:${date}T${time}`);
lines.push(`DTEND:${date}T${time}`);
lines.push(`SUMMARY:SuppPlan – ${label}`);
lines.push(`DESCRIPTION:${items.join('\\n')}`);
lines.push('END:VEVENT');
}
}


lines.push('END:VCALENDAR');
const ics = lines.join('\r\n');


return new NextResponse(ics, {
status: 200,
headers: {
'Content-Type': 'text/calendar; charset=utf-8',
'Content-Disposition': 'attachment; filename="suppplan.ics"'
}
});
} catch (e: any) {
return new NextResponse(`ICS error: ${e?.message || 'unknown'}`, { status: 500 });
}
}
