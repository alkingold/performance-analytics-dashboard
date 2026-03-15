import { DashboardResponse } from '@/features/dashboard/types/dashboard';
import { fetchDashboardData } from '@/shared/api/dashboard';
import { useQuery } from '@tanstack/react-query';

export default function useDashboardData() {
  return useQuery<DashboardResponse>({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
  });
}
