"use server";
import { apiFetch } from "@/lib/api-client";
import { accessToken } from "@/lib/constant";
import { cookies } from "next/headers";

type RequestFormData = {
  title?: string;
  description?: string;
  assignee_id?: string;
  due_date?: string;
  status?: string;
  epic_id?: string;
};
export const updateTaskAction = async (taskId: string, data: RequestFormData) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(accessToken)?.value;
    if (!token) {
      return {
        success: false,
        error: "Unauthorized: missing access token",
      };
    }
    const result = await apiFetch({
      path: `/rest/v1/tasks?id=eq.${taskId}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
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
};
