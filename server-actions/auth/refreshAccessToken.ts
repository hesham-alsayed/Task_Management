"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api-client";
import { accessToken, refreshToken } from "@/lib/constant";

export async function refreshAccessToken() {
  try {
    const cookieStore = await cookies();
    const refresh_token = cookieStore.get("refresh_token")?.value;
    console.log(refresh_token);
    if (!refresh_token) {
      throw "No refresh token";
    }

    const res = await apiFetch({
      path: `/auth/v1/token?grant_type=refresh_token`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token }),
    });

    cookieStore.set(accessToken, res.data.access_token, {
      httpOnly: true,
      path: "/",
      maxAge: 120,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.data;
  } catch (error) {
    throw typeof error === "string" ? error : "Refresh failed";
  }
}
