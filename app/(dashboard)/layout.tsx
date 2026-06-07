import AuthProvider from "@/components/shared/AuthProvider";
import DashboardShell from "@/components/shared/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>
    <AuthProvider>
      {children}
    </AuthProvider>
  </DashboardShell>;
}