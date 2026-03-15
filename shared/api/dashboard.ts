import { DashboardResponse } from '@/features/dashboard/types/dashboard';

export async function fetchDashboardData(): Promise<DashboardResponse> {
  const res = await fetch('/api/dashboard');

  if (!res.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  return res.json();
}
