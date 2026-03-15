import DashboardHeader from '@/features/dashboard/components/DashboardHeader';

type DashboardLayoutProps = { children: React.ReactNode };

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="p-8 max-w-7xl mx-auto space-y-6">
      <DashboardHeader />
      {children}
    </main>
  );
}

export default DashboardLayout;
