import DashboardShell from "@/components/shared/DashboardShell";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token")?.value;

  // 1. validate token
  if (accessToken) {
    const userRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/user`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    if (userRes.ok) {
      return <DashboardShell>{children}</DashboardShell>;
    }
  }

  // 2. refresh via API (ONLY CALL)
  const refreshRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
    {
      method: "POST",
      cache: "no-store",
    },
  );

  if (refreshRes.ok) {
    return <DashboardShell>{children}</DashboardShell>;
  }

  // 3. fail
  redirect("/login");
}
