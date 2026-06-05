"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "@/components/reset-password/ResetPasswordForm";
import ToastMessage from "@/components/shared/ToastMessage";

function ResetPasswordContent() {
  const searchParams = useSearchParams();

  const accessToken = searchParams.get("access_token");
  const error = searchParams.get("error");

  if (error || !accessToken) {
    return (
      <ToastMessage
        type="error"
        message="Invalid or expired reset link."
        autoClose={false}
      />
    );
  }

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <ResetPasswordForm />
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
}
