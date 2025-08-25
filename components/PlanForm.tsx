'use client';
import React, { useState } from 'react';
import PlanResult from './PlanResult';

type Plan = any;

const GOALS = ['Energy', 'Focus', 'Sleep', 'Longevity', 'Muscle/Recovery', 'Immunity'];
const DIETS = ['Balanced', 'Keto', 'Vegan', 'Vegetarian', 'Paleo'];

export default function PlanForm() {
  const [goals, setGoals] = useState<string[]>(['Energy']);
  const [otherGoal, setOtherGoal] = useState('');
  const [diet, setDiet] = useState('Balanced');
  const [allergies, setAllergies] = useState('');
  const [medical, setMedical] = useState('');
  const [meds, setMeds] = useState('');
  const [pregnancy, setPregnancy] = useState<'no'|'yes'|'n/a'>('n/a');
  const [caffeine, setCaffeine] = useState('1-2 cups/day');
  const [country, setCountry] = useState('EU');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [error, setError] = useState<string | null>(null);

  function toggleGoal(g: string) {
    setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setPlan(null);
    try {
      const resp = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'plan',
          goals: [...goals, otherGoal].filter(Boolean),
          diet, allergies, medical, meds, pregnancy, caffeine, country
        })
      });
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      setPlan(data);
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-2xl shadow space-y-4">
        <div>
          <div className="text-sm font-semibold mb-2">Goals</div>
          <div className="flex flex-wrap gap-2">
            {GOALS.map(g => (
              <button
                key={g}
                type="button"
                onClick={() => toggleGoal(g)}
                className={`px-3 py-1 rounded-lg border ${goals.includes(g) ? 'bg-primary text-white border-primary' : ''}`}
              >{g}</button>
            ))}
          </div>
          <input
            className="mt-2 w-full border rounded-md px-3 py-2"
            placeholder="Other goal (optional)"
            value={otherGoal}
            onChange={e => setOtherGoal(e.target.value)}
          />
        </div>

        <label className="block">
          <span className="text-sm">Diet</span>
          <select className="mt-1 w-full border rounded-md p-2" value={diet} onChange={e => setDiet(e.target.value)}>
            {DIETS.map(d => <option key={d}>{d}</option>)}
          </select>
        </label>

        <label className="block">
          <span className="text-sm">Allergies / Avoid</span>
          <input className="mt-1 w-full border rounded-md p-2" value={allergies} onChange={e => setAllergies(e.target.value)} />
        </label>

        <label className="block">
          <span className="text-sm">Medical conditions</span>
          <textarea className="mt-1 w-full border rounded-md p-2" rows={2} value={medical} onChange={e => setMedical(e.target.value)} />
        </label>

        <label className="block">
          <span className="text-sm">Prescription meds</span>
          <textarea className="mt-1 w-full border rounded-md p-2" rows={2} value={meds} onChange={e => setMeds(e.target.value)} />
        </label>

        <label className="block">
          <span className="text-sm">Pregnancy</span>
          <select className="mt-1 w-full border rounded-md p-2" value={pregnancy} onChange={e => setPregnancy(e.target.value as any)}>
            <option value="n/a">N/A</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm">Caffeine / Alcohol / Nicotine (free text)</span>
          <input className="mt-1 w-full border rounded-md p-2" value={caffeine} onChange={e => setCaffeine(e.target.value)} />
        </label>

        <label className="block">
          <span className="text-sm">Region</span>
          <select className="mt-1 w-full border rounded-md p-2" value={country} onChange={e => setCountry(e.target.value)}>
            <option>EU</option><option>US</option><option>UK</option><option>Other</option>
          </select>
        </label>

        <button className="bg-primary text-white px-4 py-2 rounded-lg" disabled={loading}>
          {loading ? 'Generating…' : 'Generate Plan'}
        </button>
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>

      <div>{plan ? <PlanResult plan={plan} /> : <div className="text-gray-500">Plan will appear here…</div>}</div>
    </div>
  );
}

