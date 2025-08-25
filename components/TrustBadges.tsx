export default function TrustBadges() {
  const items = [
    { label: 'Science-based', desc: 'Conservative guidance' },
    { label: 'No guesswork', desc: 'Simple weekly plan' },
    { label: 'Not medical advice', desc: 'Educational only' },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(i => (
        <div key={i.label} className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
          <div className="text-sm">
            <div className="font-medium">{i.label}</div>
            <div className="text-gray-600 text-xs">{i.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
