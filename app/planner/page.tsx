import PlanForm from '@/components/PlanForm';
import SEO from '@/components/SEO';
import ToolPing from '@/components/ToolPing';


export const dynamic = 'force-dynamic';


export default function PlannerPage() {
return (
<div className="space-y-4">
<SEO title="Supplement Planner" description="Tell us your goals and constraints. We’ll generate a structured weekly schedule with timing, interactions, and shopping list." />
  <ToolPing tool="planner" />
<h1 className="text-3xl font-bold text-primary">Planner</h1>
<p className="text-gray-700">Tell us your goals and constraints. We’ll generate a structured schedule with timing, interactions, and warnings.</p>
<PlanForm />
</div>
);
}
