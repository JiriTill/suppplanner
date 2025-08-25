'use client';
import Image from 'next/image';


export default function HeroComic() {
// If you drop an image at /public/hero-comic.png it will render.
// Otherwise, we show a playful bubble mock that matches brand colors.
const hasImg = false; // flip to true when you add /public/hero-comic.png
if (hasImg) {
return (
<div className="card p-3">
<Image src="/hero-comic.png" alt="Two people discussing SuppPlanner" width={1200} height={800} className="rounded-xl" />
</div>
);
}
return (
<div className="card p-6 flex items-center justify-center">
<div className="grid md:grid-cols-2 gap-6 items-center">
<div className="relative">
<div className="inline-block bg-primary text-white px-4 py-3 rounded-2xl">SuppPlanner!</div>
<div className="absolute -bottom-3 left-8 w-0 h-0 border-t-[12px] border-t-primary border-l-[16px] border-l-transparent"></div>
</div>
<div className="relative">
<div className="inline-block bg-accent text-ink px-4 py-3 rounded-2xl">What’s with my planner? 😄</div>
<div className="absolute -bottom-3 left-8 w-0 h-0 border-t-[12px] border-t-accent border-l-[16px] border-l-transparent"></div>
</div>
</div>
</div>
);
}
