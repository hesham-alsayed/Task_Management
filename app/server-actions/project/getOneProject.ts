"use server";
import { apiFetch } from "@/lib/api-client";
import { accessToken } from "@/lib/constant";
import { cookies } from "next/headers";

export async function getOneProjectAction(projectId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(accessToken)?.value;
    const result = await apiFetch({
      method: "GET",
      path: `/rest/v1/projects?id=eq.${projectId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result.data;
  } catch (error) {
    throw error || "Error in netwok or internal server";
  }
}
