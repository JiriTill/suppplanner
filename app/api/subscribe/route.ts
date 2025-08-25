import { NextResponse } from 'next/server';


export async function POST(req: Request) {
try {
const { email } = await req.json();
if (!email) return new NextResponse('Email required', { status: 400 });


// Try Buttondown first
if (process.env.BUTTONDOWN_API_KEY) {
const r = await fetch('https://api.buttondown.email/v1/subscribers', {
method: 'POST',
headers: {
Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
'Content-Type': 'application/json'
},
body: JSON.stringify({ email })
});
if (!r.ok) return new NextResponse(await r.text(), { status: r.status });
return NextResponse.json({ ok: true });
}


// Fallback Mailchimp
if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_DC && process.env.MAILCHIMP_LIST_ID) {
const { MAILCHIMP_API_KEY, MAILCHIMP_DC, MAILCHIMP_LIST_ID } = process.env as Record<string,string>;
const url = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;
const r = await fetch(url, {
method: 'POST',
headers: {
Authorization: `apikey ${MAILCHIMP_API_KEY}`,
'Content-Type': 'application/json'
},
body: JSON.stringify({ email_address: email, status: 'pending' })
});
if (!r.ok) return new NextResponse(await r.text(), { status: r.status });
return NextResponse.json({ ok: true });
}


return new NextResponse('No email provider configured', { status: 501 });
} catch (e: any) {
return new NextResponse(`Subscribe error: ${e?.message || 'unknown'}`, { status: 500 });
}
}
