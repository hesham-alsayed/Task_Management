"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api-client";
import {
  ACCESS_TOKEN_OPTIONS,
  REFRESH_TOKEN_OPTIONS,
  accessToken,
  refreshToken,
} from "@/lib/constant";

export type LoginFormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export async function login(loginData: LoginFormData) {
  try {
    const response = await apiFetch({
      path: "/auth/v1/token?grant_type=password",
      method: "POST",
      body: JSON.stringify(loginData),
    });

    const cookieStore = await cookies();

    const refreshMaxAge = loginData.rememberMe
      ? 30 * 24 * 60 * 60
      : 24 * 60 * 60;

    cookieStore.set(accessToken, response.data.access_token, {
      ...ACCESS_TOKEN_OPTIONS,
      maxAge: response.data.expires_in || 3600,
    });

    cookieStore.set(refreshToken, response.data.refresh_token, {
      ...REFRESH_TOKEN_OPTIONS,
      maxAge: refreshMaxAge,
    });

    return response.data.user.user_metadata;
  } catch (error) {
    throw error || "Network or internal server error";
  }
}
