'use client';
))}
</div>
<input
className="mt-2 w-full border rounded-md px-3 py-2"
placeholder="Other goal (optional)"
value={otherGoal}
onChange={e=>setOtherGoal(e.target.value)}
/>
</div>


<label className="block">
<span className="text-sm">Diet</span>
<select className="mt-1 w-full border rounded-md p-2" value={diet} onChange={e=>setDiet(e.target.value)}>
{DIETS.map(d=> <option key={d}>{d}</option>)}
</select>
</label>


<label className="block">
<span className="text-sm">Allergies / Avoid</span>
<input className="mt-1 w-full border rounded-md p-2" value={allergies} onChange={e=>setAllergies(e.target.value)} />
</label>


<label className="block">
<span className="text-sm">Medical conditions</span>
<textarea className="mt-1 w-full border rounded-md p-2" rows={2} value={medical} onChange={e=>setMedical(e.target.value)} />
</label>


<label className="block">
<span className="text-sm">Prescription meds</span>
<textarea className="mt-1 w-full border rounded-md p-2" rows={2} value={meds} onChange={e=>setMeds(e.target.value)} />
</label>


<label className="block">
<span className="text-sm">Pregnancy</span>
<select className="mt-1 w-full border rounded-md p-2" value={pregnancy} onChange={e=>setPregnancy(e.target.value as any)}>
<option value="n/a">N/A</option>
<option value="no">No</option>
<option value="yes">Yes</option>
</select>
</label>


<label className="block">
<span className="text-sm">Caffeine / Alcohol / Nicotine (free text)</span>
<input className="mt-1 w-full border rounded-md p-2" value={caffeine} onChange={e=>setCaffeine(e.target.value)} />
</label>


<label className="block">
<span className="text-sm">Region</span>
<select className="mt-1 w-full border rounded-md p-2" value={country} onChange={e=>setCountry(e.target.value)}>
<option>EU</option>
<option>US</option>
<option>UK</option>
<option>Other</option>
</select>
</label>


<button className="bg-primary text-white px-4 py-2 rounded-lg" disabled={loading}>
{loading ? 'Generating…' : 'Generate Plan'}
</button>
{error && <div className="text-red-600 text-sm">{error}</div>}
</form>


<div>
{plan ? <PlanResult plan={plan}/> : <div className="text-gray-500">Plan will appear here…</div>}
</div>
</div>
);
}
