"use client";

import { Task } from "@/components/epicDetails/EpicModalDetails";
import { getAllProjectTasksAction } from "@/server-actions/tasks/getAllProjectTasks";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { usePaginationData } from "./usePaginationData";
import { BoardItem } from "@/types/task";
import { updateTaskStatusAction } from "@/server-actions/tasks/updateTaskStatus";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setGlobalBoardData, setGlobalListData } from "@/app/store/features/tasks/taskSlice";

type Status = "loading" | "success" | "error";

export const useProjectTasks = () => {
  const params = useParams();
  const projectId = params.projectId as string;
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>(null);
  const [initialRender, setInitialRender] = useState(true);
  const searchTitle = searchParams.get("title") || "";
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

  const [boardData, setBoardData] = useState<BoardItem[]>(
    statuses.map((status) => ({
      key: status,
      name: status.split("_").join(" "),

      tasks: [],

      offset: 0,
      limit: 1,
      totalCount: 0,

      loading: false,
      loadingMore: false,

      loaded: false,
      hasMore: true,
    }))
  );

  useEffect(() => {
    setBoardData(
      statuses.map((status) => ({
        key: status,
        name: status.split("_").join(" "),
        tasks: [],
        offset: 0,
        limit: 1,
        totalCount: 0,
        loading: false,
        loadingMore: false,
        loaded: false,
        hasMore: true,
      }))
    );
  }, [searchTitle]);
  const loadStatusTasks = async (status: string) => {
    const currentStatus = boardData.find((s) => s.key === status);

    if (!currentStatus || currentStatus.loaded || currentStatus.loading) return;
    console.log("calling", status);
    setBoardData((prev) =>
      prev.map((item) => (item.key === status ? { ...item, loading: true } : item))
    );

    try {
      const limit = currentStatus.limit.toString();
      const offset = currentStatus.offset.toString();

      const { data, totalCount } = await getAllProjectTasksAction({
        projectId,
        status,
        limit,
        offset,
        searchValue: searchTitle,
      });

      setBoardData((prev) =>
        prev.map((item) =>
          item.key === status
            ? {
                ...item,
                tasks: data,
                totalCount,
                offset: data.length,
                loaded: true,
                loading: false,
                hasMore: data.length < totalCount,
              }
            : item
        )
      );
    } catch (error: any) {
      setBoardData((prev) =>
        prev.map((item) => (item.key === status ? { ...item, loading: false } : item))
      );

      setError(error.message || "Error loading tasks Or Network Error");
    }
  };

  useEffect(() => {
    dispatch(setGlobalBoardData(boardData));
  }, [boardData]);
  const loadMoreStatusTasks = async (status: string) => {
    const current = boardData.find((item) => item.key === status);
    const isReturned = !current || current.loadingMore || current.loading || !current.hasMore;
    if (isReturned) return;
    setBoardData((prev) =>
      prev.map((item) =>
        item.key === status
          ? {
              ...item,
              loadingMore: true,
            }
          : item
      )
    );
    try {
      const limit = current.limit.toString();
      const offset = current.offset.toString();
      const { data, totalCount } = await getAllProjectTasksAction({
        projectId,
        status,
        limit,
        offset,
        searchValue: searchTitle,
      });
      setBoardData((prev) =>
        prev.map((item) => {
          if (item.key === status) {
            return {
              ...item,
              tasks: [...item.tasks, ...data],
              offset: item.offset + data.length,
              totalCount,
              hasMore: item.offset + data.length < totalCount,
              loadingMore: false,
            };
          }

          return item;
        })
      );
    } catch (error: any) {
      setBoardData((prev) =>
        prev.map((item) => (item.key === status ? { ...item, loadingMore: false } : item))
      );
      setError(error.message || "Error loading More tasks");
    }
  };

  useEffect(() => {
    dispatch(setGlobalBoardData(boardData));
  }, [boardData]);
  console.log(boardData);
  const enabled = searchParams.get("view") === "list";

  const pagination = usePaginationData(
    getAllProjectTasksAction,
    5,
    {
      projectId,
      searchkey: "title",
      searchValue: searchTitle,
    },
    enabled
  );

  useEffect(() => {
    dispatch(setGlobalListData(pagination.data));
  }, [pagination.data]);
  useEffect(() => {
    setInitialRender(false);
  }, []);

  return {
    boardData,
    setBoardData,
    error,
    loadStatusTasks,
    initialRender,
    loadMoreStatusTasks,
    pagination,
  };
};
