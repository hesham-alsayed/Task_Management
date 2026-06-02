"use client";

import ResetPasswordForm from "@/components/reset-password/ResetPasswordForm";
import ToastMessage from "@/components/shared/ToastMessage";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();

  const accessToken = searchParams.get("access_token");
  const error = searchParams.get("error");

  // ❌ error handling
  if (error) {
    return (
      <ToastMessage
        type="error"
        message="Invalid or expired reset link."
        autoClose={false}
      />
    );
  }

  // ❌ missing token
  if (!accessToken) {
    return (
      <ToastMessage
        type="error"
        message="Invalid or expired reset link."
        autoClose={false}
      />
    );
  }

  // ✅ success
  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <ResetPasswordForm />
    </main>
  );
}
