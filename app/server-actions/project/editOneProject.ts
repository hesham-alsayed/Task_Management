"use server";
import { ProjectFormData } from "@/hooks/useProjectForm";
import { apiFetch } from "@/lib/api-client";
import { accessToken } from "@/lib/constant";
import { cookies } from "next/headers";

export async function editOneProjectAction(
  projectId: string,
  body: ProjectFormData,
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(accessToken)?.value;
    const result = await apiFetch({
      method: "PATCH",
      path: `/rest/v1/projects?id=eq.${projectId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    console.log(result.data);
    return result.data;
  } catch (error) {
    throw error || "Error in netwok or internal server";
  }
}
