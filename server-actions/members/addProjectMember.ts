"use server";
import { apiFetch } from "@/lib/api-client";
import { accessToken } from "@/lib/constant";
import { cookies } from "next/headers";

type RequestMemberBody = {
  p_email: string;
  p_project_id: string;
  p_app_url: string;
  p_base_url: string;
};
export const AddProjectMemberAction = async (body: RequestMemberBody) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(accessToken)?.value;
    if (!token) {
      throw "Unauthorized: missing access token";
    }
    const result = await apiFetch({
      path: `/rest/v1/rpc/invite_member`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return result.data;
  } catch (error) {
    throw error || "Network or internal server error";
  }
};
