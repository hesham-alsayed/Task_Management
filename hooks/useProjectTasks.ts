"use client";
import { getAllProjectTasksAction } from "@/server-actions/tasks/getAllProjectTasks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Status = "loading" | "success" | "error";
export const useProjectTasks = () => {
  const params = useParams();
  const projectId = params.projectId as string;
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [retryLoading, setRetryLoading] = useState(false);
  const [formattedData, setFormattedData] = useState<any>([]);
  const statuses = [
    "TO_DO",
    "IN_PROGRESS",
    "BLOCKED",
    "IN_REVIEW",
    "READY_FOR_QA",
    "REOPENED",
    "READY_FOR_PRODUCTION",
    "DONE",
  ];

  const fetchTasks = async () => {
    try {
      setStatus("loading");

      const results = await Promise.all(
        statuses.map(async (status) => {
          const tasks = await getAllProjectTasksAction(projectId, status);

          return {
            key: status,
            name: status.split("_").join(" "),
            tasks,
          };
        }),
      );

      setFormattedData(results);

      const allTasks = results.flatMap((item) => item.tasks);
      setTasks(allTasks);

      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  const retylLoadTasks = async () => {
    try {
      setError(null);
      setRetryLoading(true);

      const results = await Promise.all(
        statuses.map(async (status) => {
          const tasks = await getAllProjectTasksAction(projectId, status);

          return {
            key: status,
            name: status.split("_").join(" "),
            tasks,
          };
        }),
      );

      setFormattedData(results);

      const allTasks = results.flatMap((item) => item.tasks);
      setTasks(allTasks);

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setError("Error in Network or fetching Project tasks from server");
    } finally {
      setRetryLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  useEffect(() => {
    localStorage.clear();
  }, []);

  return { formattedData, status, tasks, retylLoadTasks, retryLoading, error };
};
