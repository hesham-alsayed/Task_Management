"use server";
import { RequestEpicBody } from "@/hooks/useNewEpicForm";
import { apiFetch } from "@/lib/api-client";
import { accessToken } from "@/lib/constant";
import { cookies } from "next/headers";

export const addNewEpicAction = async (body: RequestEpicBody) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(accessToken)?.value;
    const result = await apiFetch({
      path: `/rest/v1/epics`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    return result.data;
  } catch (error) {
    throw error || "Network or internal server error";
  }
};
