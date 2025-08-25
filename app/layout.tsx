import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';


export const metadata: Metadata = {
  title: 'SuppPlanner – Simple, safer supplement plans',
  description: 'Free supplement planner & stack checker. Create personalized weekly schedules, check for overlaps, avoid timing mistakes. Science-based, no signup required.',
themeColor: '#0f7a4e',
icons: { icon: '/favicon.ico' },
openGraph: {
title: 'SuppPlanner',
description: 'Build a simple, safer supplement plan. Check your stack. Browse the library.',
url: 'https://your-domain.tld', // TODO: set
siteName: 'SuppPlanner',
type: 'website',
},
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body>
{process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
<Script
id="adsense"
async
src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
crossOrigin="anonymous"
strategy="afterInteractive"
/>
)}
<Header />
{children}
<Footer />
</body>
</html>
);
}
