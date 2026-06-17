"use server";

import { NewTaskFormData } from "@/hooks/useAddNewTask";
import { apiFetch } from "@/lib/api-client";
import { accessToken } from "@/lib/constant";
import { cookies } from "next/headers";

export const addNewTaskAction = async (body: NewTaskFormData) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(accessToken)?.value;
    if (!token) {
      throw "Unauthorized: missing access token";
    }
    const result = await apiFetch({
      path: `/rest/v1/tasks`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return result.data;
  } catch (error) {
    throw error;
  }
};
