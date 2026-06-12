"use client";
import { getAllEpicsAction } from "@/app/server-actions/epics/getAllEpicList";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Status = "loading" | "success" | "error";

export type Epic = {
  id: string;
  epic_id: string;

  title: string;
  description?: string | null;

  project_id: string;

  deadline?: string | null;

  created_at: string;

  assignee: {
    sub: string;
    name: string;
    email: string;
    department?: string | null;
  };

  created_by: {
    sub: string;
    name: string;
    email: string;
    department?: string | null;
  };
};

export const useGetAllEpics = () => {
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [retryLoading, setRetryLoading] = useState(false);
  const [data, setData] = useState([]);
  const params = useParams();
  const projectId = params.projectId as string;

  const fetchEpics = async () => {
    return await getAllEpicsAction(projectId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus("loading");
        setError(null);
        const data = await fetchEpics();
        console.log(data);
        setData(data);
        setStatus("success");
      } catch (err: any) {
        setError(err?.message || "Network Error");
        setStatus("error");
      }
    };

    fetchData();
  }, [projectId]);

  const retryGetAllEpics = async () => {
    try {
      setRetryLoading(true);
      const data = await fetchEpics();
      setData(data);
      setError(null);
      setStatus("success");
    } catch (err: any) {
      setError(err?.message || "Network Error");
    } finally {
      setRetryLoading(false);
    }
  };

  return {
    data,
    error,
    retryGetAllEpics,
    status,
    retryLoading,
  };
};
