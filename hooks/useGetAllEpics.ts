"use client";

import { useParams } from "next/navigation";
import { usePaginationData } from "./usePaginationData";
import { getAllEpicsAction } from "@/server-actions/epics/getAllEpicList";

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
  const params = useParams();

  const projectId = params.projectId as string;

  const pagination = usePaginationData(getAllEpicsAction, 4, {
    projectId,
  });
  
  return {
    ...pagination,
  };
};
