'use client';
import { useEffect } from 'react';

export default function ToolPing({ tool }: { tool: 'planner' | 'checker' }) {
  useEffect(() => {
    fetch(`/api/metrics/use?tool=${tool}`, { method: 'POST', keepalive: true }).catch(() => {});
  }, [tool]);
  return null;
}
