import fs from 'node:fs/promises';
import path from 'node:path';


const blogDir = path.join(process.cwd(), 'data', 'blog');


export type Post = { slug: string; title: string; date: string; excerpt: string; contentHtml: string };


export async function getAllPosts(): Promise<Post[]> {
try {
const listRaw = await fs.readFile(path.join(blogDir, 'posts.json'), 'utf-8');
const list: { slug: string }[] = JSON.parse(listRaw);
const out: Post[] = [];
for (const { slug } of list) {
const raw = await fs.readFile(path.join(blogDir, `${slug}.json`), 'utf-8');
out.push(JSON.parse(raw));
}
return out.sort((a, b) => b.date.localeCompare(a.date));
} catch {
return [];
}
}


export async function getLatestPosts(n = 3) {
const all = await getAllPosts();
return all.slice(0, n);
}


export async function getPostBySlug(slug: string): Promise<Post | null> {
try {
const raw = await fs.readFile(path.join(blogDir, `${slug}.json`), 'utf-8');
return JSON.parse(raw);
} catch {
return null;
}
}
