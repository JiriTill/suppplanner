import Image from 'next/image';

export const metadata = { title: 'About – SuppPlanner' };

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "SuppPlanner",
        "url": "",
        "description": "Free supplement planner & stack checker.",
        "founder": { "@type": "Person", "name": "Jiri Till" }
      }
    ]
  };

  const team = [
    {
      name: "Jiri Till",
      role: "Founder & Product",
      bio: "Builds simple tools that help people plan clearly. Focused on usability and conservative guidance.",
      img: "/logo192.png"
    },
    // add more members as you like
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-3xl font-semibold">About SuppPlanner</h1>
      <p className="mt-3 text-gray-700">
        SuppPlanner is a free planning & checking tool for supplements. We keep it simple and conservative:
        clear schedules, overlap hints, and timing tips sourced from our curated ingredient library.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Team</h2>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        {team.map(m => (
          <div key={m.name} className="card p-4 flex gap-4 items-start">
            <Image src={m.img} alt={m.name} width={56} height={56} className="rounded-xl" />
            <div>
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm text-gray-600">{m.role}</div>
              <p className="text-sm text-gray-700 mt-2">{m.bio}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-gray-600">
        Disclaimer: Educational use only. SuppPlanner does not provide medical advice.
      </p>
    </main>
  );
}
