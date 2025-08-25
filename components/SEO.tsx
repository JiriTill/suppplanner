export default function SEO({ title, description }: { title: string; description: string }) {
return (
<>
<title>{title}</title>
<meta name="description" content={description} />
</>
);
}
