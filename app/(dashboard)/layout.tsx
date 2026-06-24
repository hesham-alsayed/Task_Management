import AuthProvider from "@/components/shared/AuthProvider";
import DashboardShell from "@/components/shared/DashboardShell";
import TaskDetailsMain from "@/components/taskDetails/TaskDetailsMain";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell>
      <AuthProvider>
        {children}
        <TaskDetailsMain />
      </AuthProvider>
    </DashboardShell>
  );
}
