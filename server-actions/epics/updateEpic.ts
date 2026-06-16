"use server";
import { apiFetch } from "@/lib/api-client";
import { accessToken } from "@/lib/constant";
import { cookies } from "next/headers";

type RequestEpicBody = {
  title?: string | null;
  description?: string | null;
  assignee_id?: string | null;
  deadline?: string | null;
};

export async function updateEpicAction(epicId: string, body: RequestEpicBody) {
  try {
    console.log("body update epic", body);
    const cookieStore = await cookies();
    const token = cookieStore.get(accessToken)?.value;

    if (!token) {
      return {
        success: false,
        error: "Unauthorized: missing access token",
      };
    }

    const result = await apiFetch({
      path: `/rest/v1/epics?id=eq.${epicId}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    console.log("result update epic", result);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}
