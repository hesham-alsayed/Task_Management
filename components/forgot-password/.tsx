"use client";

import { useForgotPasswordForm } from "@/hooks/useForgotPasswordForm";

export default function ForgotPasswordForm() {
  const {
    form,
    onSubmit,
    isLoading,
    isSuccess,
    handleResend,
    canResend,
    formattedTime,
  } = useForgotPasswordForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="bg-background rounded-lg p-8 space-y-6">

      <h1 className="text-lg font-bold">Forgot Password</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* EMAIL INPUT */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className={`input-form ${
              errors.email ? "border-red-500" : ""
            }`}
            {...register("email")}
          />

          {errors.email && (
            <p className="text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full h-12"
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>

        {/* SUCCESS MESSAGE */}
        {isSuccess && (
          <div className="space-y-4 mt-6">

            <p className="text-green-700 text-sm">
              If an account exists with this email, we’ve sent a password reset link.
            </p>

            <div className="flex items-center justify-between border-t pt-3">

              <span className="text-xs font-bold">
                Didn’t receive email?
              </span>

              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend || isLoading}
                className="text-xs text-primary font-bold disabled:opacity-50"
              >
                {canResend
                  ? "Resend"
                  : `Resend in ${formattedTime}`}
              </button>

            </div>
          </div>
        )}
      </form>
    </div>
  );
}