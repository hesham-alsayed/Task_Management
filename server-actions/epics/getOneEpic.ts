"use server";
import { apiFetch } from "@/lib/api-client";
import { accessToken } from "@/lib/constant";
import { cookies } from "next/headers";

type Props = {
  projectId: string;
  epicId: string;
};
export async function getOneEpicAction({ projectId, epicId }: Props) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(accessToken)?.value;
    const result = await apiFetch({
      method: "GET",
      path: `/rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    throw error || "Error in netwok or internal server";
  }
}
