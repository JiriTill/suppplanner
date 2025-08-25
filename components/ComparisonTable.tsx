export default function ComparisonTable() {
  const Row = ({ feature, a, b, c }: { feature: string; a?: boolean; b?: boolean; c?: boolean }) => (
    <tr className="border-t">
      <th scope="row" className="text-left py-2 pr-4 font-normal">{feature}</th>
      {[a, b, c].map((v, i) => (
        <td key={i} className="text-center py-2">{v ? '✓' : '—'}</td>
      ))}
    </tr>
  );

  return (
    <div className="card p-4 overflow-x-auto">
      <div className="text-sm text-gray-600 mb-2">Why SuppPlanner?</div>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left py-2 pr-4">Feature</th>
            <th className="text-center py-2">SuppPlanner</th>
            <th className="text-center py-2">Google/Forums</th>
            <th className="text-center py-2">Spreadsheets</th>
          </tr>
        </thead>
        <tbody>
          <Row feature="Science-based guidance" a b={false} c={false} />
          <Row feature="Interaction/overlap checks" a b={false} c={false} />
          <Row feature="Weekly schedule builder" a b={false} c={false} />
          <Row feature="Export to calendar (.ics)" a b={false} c />
          <Row feature="Free to use" a b a={undefined as any} />
          <Row feature="Simple, fast workflow" a b c />
        </tbody>
      </table>
    </div>
  );
}
