"use server";
import { apiFetch } from "@/lib/api-client";
import { accessToken } from "@/lib/constant";
import { cookies } from "next/headers";

type body = {
  p_token: string;
};

export const AcceptInvitationAction = async (body: body) => {
  try {
    const cookieStore = await cookies();
    const userToken = cookieStore.get(accessToken)?.value;
    if (!userToken) {
      throw "Unauthorized: missing access token";
    }
    const result = await apiFetch({
      path: `/rest/v1/rpc/accept_invitation`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return result.data;
  } catch (error) {
    throw error || "Network or internal server error";
  }
};
