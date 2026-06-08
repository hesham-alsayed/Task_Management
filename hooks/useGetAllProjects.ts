"use client";

import { getAllProjectsAction } from "@/app/server-actions/projects/getAllProjects";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Status = "idle" | "loading" | "success" | "error";

export const useGetAllProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [retryLoading, setRetryLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setStatus("loading");
      setError(null);

      const data = await getAllProjectsAction();

      setProjects(data ?? []);
      setStatus("success");
    } catch (err: any) {
      const message = err?.message || "Network or server error";
      setError(message);
      setStatus("error");
      toast.error(message);
    }
  };

  const retryGetAllProjects = async () => {
    try {
      setRetryLoading(true);

      const data = await getAllProjectsAction();

      setProjects(data ?? []);
      setError(null);
      setStatus("success");
    } catch (err: any) {
      const message = err?.message || "Network or server error";
      setError(message);
      setStatus("error");
      toast.error(message);
    } finally {
      setRetryLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    status,
    error,
    retryLoading,
    retryGetAllProjects,
  };
};
