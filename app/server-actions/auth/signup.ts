"use server";

import { apiFetch } from "@/lib/api-client";
import { cookies } from "next/headers";
import {
  ACCESS_TOKEN_OPTIONS,
  REFRESH_TOKEN_OPTIONS,
  accessToken,
  refreshToken,
} from "@/lib/constant";

export type SignupFormData = {
  email: string;
  password: string;
  data: {
    name: string;
    jobTitle?: string;
  };
};

export default async function signup(signupData: SignupFormData) {
  try {
    const response = await apiFetch({
      path: "/auth/v1/signup",
      method: "POST",
      body: JSON.stringify(signupData),
    });

    const cookieStore = await cookies();
    
    cookieStore.set(accessToken, response.data.access_token, ACCESS_TOKEN_OPTIONS);
    cookieStore.set(refreshToken, response.data.refresh_token, REFRESH_TOKEN_OPTIONS);

    return response.data.user.user_metadata;
  } catch (error) { 
    console.log(error)
    throw typeof error === "string"
      ? error
      : "Failed to create account";
  }
}