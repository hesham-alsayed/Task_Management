"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api-client";
import { accessToken } from "@/lib/constant";

export async function getUserAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(accessToken)?.value;

    if (!token) {
      throw new Error("No access token found");
    }

    const data = await apiFetch({
      path: "/auth/v1/user",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw typeof error === "string" ? error : (error as Error).message || "Failed to fetch user";
  }
}