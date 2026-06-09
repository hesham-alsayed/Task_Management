"use server";

import { CreateProjectFormData } from "@/hooks/useAddNewProjectForm";
import { apiFetch } from "@/lib/api-client";
import { accessToken } from "@/lib/constant";
import { cookies } from "next/headers";

export default async function addNewProjectAction(
  projectFormData: CreateProjectFormData,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(accessToken)?.value;

  if (!token) {
    throw "Unauthorized: missing access token";
  }

  try {
    const res = await apiFetch({
      method: "POST",
      path: "/rest/v1/projects",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectFormData),
    });

    return res.data;
  } catch (error) {
    throw error || "Network or internal server error";
  }
}
