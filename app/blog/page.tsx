import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';


export const metadata = { title: 'Blog – SuppPlanner' };


export default async function BlogIndex() {
const posts = await getAllPosts();
return (
<main className="mx-auto max-w-5xl px-4 py-12">
<h1 className="text-2xl font-semibold">Blog</h1>
<div className="mt-6 grid md:grid-cols-2 gap-4">
{posts.length === 0 && <div className="text-gray-600">No posts yet.</div>}
{posts.map(p => (
<article key={p.slug} className="card p-4">
<div className="text-sm text-gray-500">{p.date}</div>
<h2 className="font-semibold mt-1"><Link href={`/blog/${p.slug}`}>{p.title}</Link></h2>
<p className="text-gray-700 mt-1 text-sm">{p.excerpt}</p>
<Link href={`/blog/${p.slug}`} className="mt-2 inline-block underline">Read more</Link>
</article>
))}
</div>
</main>
);
}
