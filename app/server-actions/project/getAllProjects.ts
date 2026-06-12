"use server";

import { apiFetch } from "@/lib/api-client";
import { accessToken } from "@/lib/constant";
import { cookies } from "next/headers";

type Props = {
  limit: string;
  offset: string;
};
export async function getAllProjectsAction(query: Props) {
  try {
    const { limit, offset } = query;
    const cookieStore = await cookies();
    const token = cookieStore.get(accessToken)?.value;
    // const token = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjRkYTQ0ZTUwLWY1NTMtNDVkZC1iYTc5LWQ0MzY4ZGYwMzNlOSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL25jd2ltbm5lZmd1bHNuY2RmbW9nLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI0MWQzOTU1Mi00YzhlLTRmMTEtOTYxYy1iZTQxYmEwNDE1NTUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzgwOTQ5NjM1LCJpYXQiOjE3ODA5NDYwMzUsImVtYWlsIjoiaGVzaGFtZWxzYXVpZWRAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6Imhlc2hhbWVsc2F1aWVkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJqb2JUaXRsZSI6IkZyb250RW5kIiwibmFtZSI6Imhpc2hhbSBhbCBzYXllZCIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiNDFkMzk1NTItNGM4ZS00ZjExLTk2MWMtYmU0MWJhMDQxNTU1In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3ODA5MjM2NzZ9XSwic2Vzc2lvbl9pZCI6IjhiOWM5ZDFkLTgwOTEtNDAwOC1iOGViLTAwZWYxNjA0ZjhhMyIsImlzX2Fub255bW91cyI6ZmFsc2V9.HM4XJ275aFx5EYAhMkNH0aLEQQIkT2sAMvxzr-9MtmJvMVb6oZDjV04qDCTVm1YK46za0UT9ObYO7sN7oXFN3AA"
    if (!token) {
      throw "Unauthorized: missing access token";
    }
    const result = await apiFetch({
      path: `/rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Prefer: "count=exact",
      },
    });

    console.log("result from action", result);
    return {
      projects: result.data,
      totalCount: Number(result.headers["content-range"]?.split("/")[1]),
    };
  } catch (error) {
    throw error || "Network or internal server error";
  }
}
