import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


export const metadata: Metadata = {
title: 'SuppPlan',
description: 'Smart, safe supplement planning assistant',
metadataBase: new URL('https://suppplan.example.com')
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body>
<Header />
<main className="container py-6">{children}</main>
<Footer />
</body>
</html>
);
}
