export default function ToolPreview() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Planner preview */}
      <div className="card p-4">
        <div className="text-sm text-gray-500 mb-2">Planner (sample week)</div>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
            <div key={d} className="text-center font-medium text-gray-700">{d}</div>
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="min-h-[80px] rounded-lg border bg-white p-2 space-y-1">
              <div className="rounded-md bg-soft px-2 py-1 text-[10px]">Magnesium – evening</div>
              {i % 2 === 0 && <div className="rounded-md bg-soft px-2 py-1 text-[10px]">Omega-3 – with meals</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Checker preview */}
      <div className="card p-4">
        <div className="text-sm text-gray-500 mb-2">Checker (example alert)</div>
        <div className="rounded-lg border bg-white p-3 space-y-2">
          <div className="text-sm font-semibold">Potential overlap detected</div>
          <div className="text-xs text-gray-700">
            Two products include <strong>Zinc</strong>. Consider total daily amount and timing.
          </div>
          <div className="text-xs text-gray-600">Tip: Separate Zinc from Magnesium if sensitive.</div>
        </div>
      </div>
    </div>
  );
}
