import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/blog';


export const revalidate = 3600;


export default async function BlogPost({ params }: { params: { slug: string } }) {
const post = await getPostBySlug(params.slug);
if (!post) return notFound();
return (
<main className="mx-auto max-w-3xl px-4 py-12">
<article className="prose max-w-none">
<h1>{post.title}</h1>
<p className="text-sm text-gray-500">{post.date}</p>
<div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
</article>
</main>
);
}
