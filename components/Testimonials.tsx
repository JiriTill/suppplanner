import testimonials from '@/data/testimonials.json';

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div aria-label={`${n} out of 5 stars`} className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < n ? "currentColor" : "none"} className={i < n ? "text-amber-500" : "text-gray-300"} aria-hidden="true">
          <path d="M12 17.3l6.18 3.7-1.64-7.03L22 8.24l-7.19-.62L12 1 9.19 7.62 2 8.24l5.46 5.73L5.82 21z" stroke="currentColor"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {testimonials.map((t) => (
        <figure key={t.name} className="card p-4">
          <Stars n={t.rating} />
          <blockquote className="mt-2 text-sm text-gray-800">“{t.quote}”</blockquote>
          <figcaption className="mt-3 text-sm">
            <div className="font-medium">{t.name}</div>
            <div className="text-gray-600">{t.tagline} · {t.country}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
