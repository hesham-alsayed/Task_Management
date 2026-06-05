import ResetPasswordForm from "@/components/reset-password/ResetPasswordForm";
import ToastMessage from "@/components/shared/ToastMessage";

type Props = {
  searchParams: Promise<{
    access_token?: string;
    error?: string;
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const accessToken = params.access_token;
  const error = params.error;

  if (error || !accessToken ) {
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