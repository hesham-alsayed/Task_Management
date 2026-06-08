"use server";

import { apiFetch } from "@/lib/api-client";

type ForgotPasswordData = {
  email: string;
};

export async function forgotPasswordAction(
  forgotPasswordData: ForgotPasswordData,
) {
  try {
    await apiFetch({
      path: "/auth/v1/recover",
      method: "POST",
      body: JSON.stringify(forgotPasswordData),
    });

    return {
      success: true,
      message:
        "If an account exists with this email, we've sent a password reset link.",
    };
  } catch (error: any) {
    throw (
      error || error.message || error.msg ||
      "Internet Connection Failed or Internal Server Error"
    );
  }
}