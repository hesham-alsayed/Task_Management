"use server";

import { apiFetch } from "@/lib/api-client";
import { accessToken } from "@/lib/constant";
import { cookies } from "next/headers";

type GetTasksParams = {
  projectId?: string;
  status?: string;
  limit?: string;
  offset?: string;
  searchValue?: string;
};

export const getAllProjectTasksAction = async ({
  projectId,
  status,
  limit,
  offset,
  searchValue,
}: GetTasksParams) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(accessToken)?.value;
    // const token = "eeyJhbGciOiJFUzI1NiIsImtpZCI6IjRkYTQ0ZTUwLWY1NTMtNDVkZC1iYTc5LWQ0MzY4ZGYwMzNlOSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL25jd2ltbm5lZmd1bHNuY2RmbW9nLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI0MWQzOTU1Mi00YzhlLTRmMTEtOTYxYy1iZTQxYmEwNDE1NTUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzgxNzk5MzcxLCJpYXQiOjE3ODE3OTU3NzEsImVtYWlsIjoiaGVzaGFtZWxzYXVpZWRAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6Imhlc2hhbWVsc2F1aWVkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJqb2JUaXRsZSI6IkZyb250RW5kIiwibmFtZSI6Imhpc2hhbSBhbCBzYXllZCIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiNDFkMzk1NTItNGM4ZS00ZjExLTk2MWMtYmU0MWJhMDQxNTU1In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3ODE3ODgyNDN9XSwic2Vzc2lvbl9pZCI6IjM1YzQzZjBmLTdhMTgtNDc4My05Yjk4LTg1ZmYxOWZmMzNmNCIsImlzX2Fub255bW91cyI6ZmFsc2V9.ZY6PhukqQ3OJ_pa_aEe5iwNUQgb-G9ulETe7yEsePQ7t7FPoaHegmmAXs1f8H1JfDOSKo0E5t-O9Ibinivo6KQ";

    if (!token) {
      throw "Unauthorized: missing access token";
    }
    const finalPath = status
      ? `/rest/v1/project_tasks?project_id=eq.${projectId}&title=ilike.%25${searchValue}%25&status=eq.${status}&limit=${limit}&offset=${offset}&order=created_at.desc`
      : `/rest/v1/project_tasks?project_id=eq.${projectId}&title=ilike.%25${searchValue}%25&limit=${limit}&offset=${offset}&order=created_at.desc`;

    console.log("finalPath", finalPath);
    console.log("searchvalue", searchValue);
    const result = await apiFetch({
      method: "GET",
      path: finalPath,
      headers: {
        Authorization: `Bearer ${token}`,
        Prefer: "count=exact",
      },
    });
    return {
      data: result.data,
      totalCount: Number(result.headers["content-range"]?.split("/")[1]),
    };
  } catch (error) {
    throw error;
  }
};
