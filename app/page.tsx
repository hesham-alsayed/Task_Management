/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthProvider from "@/components/shared/AuthProvider";
import DashboardShell from "@/components/shared/DashboardShell";

export default function HomePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (hash) {
      router.replace(`/reset-password?${hash}`);
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
      </div>
    );
  }

  return (
    <AuthProvider>
      <DashboardShell>
        <div>Your Dashboard Content</div>
      </DashboardShell>
    </AuthProvider>
  );
}
