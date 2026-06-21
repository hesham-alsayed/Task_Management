"use client";
import { getAllProjectTasksAction } from "@/server-actions/tasks/getAllProjectTasks";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Status = "loading" | "success" | "error";
export const useProjectTasks = () => {
  const params = useParams();
  const projectId = params.projectId as string;
  const searchParams = useSearchParams();

  const [boardStatus, setBoardStatus] = useState<Status>("loading");
  const [listStatus, setListStatus] = useState<Status>("loading");

  const [error, setError] = useState<string | null>(null);
  const [retryLoading, setRetryLoading] = useState(false);
  const [boardData, setBoardData] = useState<any>([]);
  const [length, setLength] = useState(null);

  const [listData, setListData] = useState<any>([]);
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

  const fetchBoardData = async () => {
    try {
      setError(null);
      setBoardStatus("loading");
      const results = await Promise.all(
        statuses.map(async (status) => {
          const tasks = await getAllProjectTasksAction(projectId, status);
          setLength((prev) => {
            return prev + tasks.length;
          });
          return {
            key: status,
            name: status.split("_").join(" "),
            tasks,
          };
        })
      );
      console.log(results);
      setBoardData(results);
      setBoardStatus("success");
    } catch (error) {
      setBoardStatus("error");
      setError("Error in Network or fetching Project tasks from server");
    }
  };

  console.log(length, "length data ");
  const fetchListData = async () => {
    try {
      setError(null);
      setListStatus("loading");
      const data = await getAllProjectTasksAction(projectId);
      setListData(data);
      setListStatus("success");
    } catch (error) {
      setListStatus("error");
      setError("Error in Network or fetching Project tasks List from server");
    }
  };
  const fetchBoardTasks = async () => {
    fetchBoardData();
  };

  const retylLoadTasks = async () => {
    fetchBoardData();
  };

  useEffect(() => {
    fetchBoardTasks();
  }, [projectId]);

  useEffect(() => {
    if (searchParams.get("view") === "list") {
      fetchListData();
    }
  }, [searchParams.get("view")]);
  useEffect(() => {
    localStorage.clear();
  }, []);

  return {
    boardData,
    listData,
    length,
    boardStatus,
    listStatus,
    retylLoadTasks,
    error,
  };
};
