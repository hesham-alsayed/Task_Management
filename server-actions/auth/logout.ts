"use server";

import { cookies } from "next/headers";
import { accessToken, refreshToken } from "@/lib/constant";

export async function logoutAction() {
  const cookieStore = await cookies();

  try {
    const token = cookieStore.get(accessToken)?.value;

    if (!token) {
      cookieStore.delete(accessToken);
      cookieStore.delete(refreshToken);

      return {
        success: true,
        message: "Already logged out",
      };
    }

    const response = await fetch(
      `${process.env.BASE_URL}/auth/v1/logout`,
      {
        method: "POST",
        headers: {
          apikey: process.env.API_KEY!,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok && response.status !== 204) {
      const errorData = await response.json().catch(() => null);

      throw new Error(
        errorData?.message || "Logout failed"
      );
    }

    cookieStore.delete(accessToken);
    cookieStore.delete(refreshToken);

    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error: any) {
    throw new Error(
      error?.message || "Internal server error"
    );
  }
}