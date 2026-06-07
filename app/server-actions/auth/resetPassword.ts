"use server";

import { apiFetch } from "@/lib/api-client";

type ResetPasswordData = {
  password: string;
  token: string;
};

export async function resetPasswordAction({
  password,
  token,
}: ResetPasswordData) {
  try {
    await apiFetch({
      path: "/auth/v1/user",
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password,
      }),
    });

    return {
      success: true,
      message: "Password updated successfully",
    };
  } catch (error: any) {
    throw (
      error || error.message || error.msg ||
      "Failed to update password"
    );
  }
}