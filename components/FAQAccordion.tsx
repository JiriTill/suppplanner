'use client';
import { useState } from 'react';

const faqs = [
  {
    q: 'What does SuppPlanner do?',
    a: 'It helps you draft a simple weekly plan and review an existing stack with clear, conservative tips — for free.',
  },
  {
    q: 'Is SuppPlanner free?',
    a: 'Yes. The Planner, Checker, and Library are free to use.',
  },
  {
    q: 'Where does the info come from?',
    a: 'From our curated dataset of common ingredients with timing notes and typical ranges.',
  },
  {
    q: 'Can I share my plan?',
    a: 'Yes — export to .ics or copy the schedule text to share.',
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y rounded-2xl border bg-white">
      {faqs.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.q}>
            <button
              className="w-full text-left px-4 py-3 flex items-center justify-between"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : i)}
            >
              <span className="font-medium">{item.q}</span>
              <span className="text-gray-500">{expanded ? '−' : '+'}</span>
            </button>
            {expanded && (
              <div className="px-4 pb-4 text-gray-700 text-sm">{item.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
