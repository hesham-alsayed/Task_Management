"use client";
import { getMembersProjectAction } from "@/server-actions/members/getMembersProject";
import { ProjectMember } from "@/components/projectMembers/MembersTable";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Status = "loading" | "success" | "error";

export const useMembersProject = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [retryLoading, setRetryLoading] = useState(false);

  const params = useParams();
  const projectId = params.projectId as string;

  const fetchMembersProject = async (projectId: string) => {
    return await getMembersProjectAction(projectId);
  };
  const getAllMembersProject = async (projectId: string) => {
    try {
      setStatus("loading");
      setError(null);
      const result = await fetchMembersProject(projectId);
      console.log(result);
      setData(result);
      setStatus("success");
    } catch (err: any) {
      setError(
        err?.message ||
          "Failed to load project members. Please try again." ||
          "Network Error",
      );
      setStatus("error");
    }
  };

  useEffect(() => {
    if (!projectId) return;
    getAllMembersProject(projectId);
  }, [projectId]);

  const retryGetMembersProject = async () => {
    try {
      if (!projectId) return;
      setRetryLoading(true);
      const result = await fetchMembersProject(projectId);

      setData(result);
      setError(null);
      setStatus("success");
    } catch (err: any) {
      setError(
        err?.message ||
          "Failed to load project members. Please try again." ||
          "Network Error",
      );
    } finally {
      setRetryLoading(false);
    }
  };

  return {
    data,
    status,
    error,
    retryLoading,
    retryGetMembersProject,
  };
};
