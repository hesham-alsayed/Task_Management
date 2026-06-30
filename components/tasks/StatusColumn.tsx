"use client";

import { useEffect, useRef } from "react";
import HeaderStatusColumn from "./HeaderStatusColumn";
import AddNewTask from "./AddNewTask";
import TaskCard from "./TaskCard";
import { Task } from "../epicDetails/EpicModalDetails";
import { useAppDispatch } from "@/app/store/hooks";
import { setOpenTaskModal, setSelectedTaskId } from "@/app/store/features/ui/uiSlice";
import Loader from "../shared/Loader";
import { useSearchParams } from "next/navigation";
import SearchIcon from "../icons/SearchIcon";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  status: {
    key: string;
    name: string;
    tasks: Task[];
    loading: boolean;
    loaded: boolean;
    loadingMore: boolean;
    hasMore: boolean;
  };
  loadStatusTasks: (status: string) => Promise<void>;
  loadMoreStatusTasks: (status: string) => Promise<void>;
};

export default function StatusColumn({ status, loadStatusTasks, loadMoreStatusTasks }: Props) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const searchTitle = searchParams.get("title");
  const isSearchMode = !!searchTitle;
  const { setNodeRef, isOver } = useDroppable({
    id: status.key,
  });
  const statusRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const handleTaskClick = (taskId: string) => {
    dispatch(setSelectedTaskId(taskId));
    dispatch(setOpenTaskModal(true));
  };

  useEffect(() => {
    const el = statusRef.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !status.loaded && !status.loading) {
          loadStatusTasks(status.key);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [status.key, status.loaded]);

  useEffect(() => {
    const el = loadMoreRef.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const isReturned =
          status.loadingMore || status.loading || !status.hasMore || !status.loaded;

        if (isReturned) return;

        loadMoreStatusTasks(status.key);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.8,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [status.key, status.loadingMore, status.loading, status.hasMore, status.loaded]);

  const isLoading = (status.loading && status.tasks.length === 0) || !status.loaded;

  const noSearchResults =
    !status.loading && status.loaded && status.tasks.length === 0 && isSearchMode;

  const statusTasksEmpty =
    !status.loading && status.loaded && status.tasks.length === 0 && !isSearchMode;

  return (
    <div ref={statusRef} className="w-[355px] flex-shrink-0 ">
      <HeaderStatusColumn status={status?.name} value={status.key} count={status?.tasks?.length} />

      <div className="mt-3 flex flex-col gap-3">
        <AddNewTask value={status.key} />

        {isLoading ? (
          <>
            <div className="h-28 rounded-xl animate-pulse bg-skeleton" />
            <div className="h-28 rounded-xl animate-pulse bg-skeleton" />
            <div className="h-28 rounded-xl animate-pulse bg-skeleton" />
          </>
        ) : (
          <div ref={setNodeRef} className="relative min-h-[220px] rounded-xl">
            {isOver && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl border-2 border-dashed border-primary bg-primary/10 backdrop-blur-sm transition-all duration-200">
                <div className="rounded-xl border border-primary/20  px-8 py-4 shadow-xl">
                  <p className="text-lg font-semibold text-primary">Drop Here</p>
                </div>
              </div>
            )}

            <div className="p-2">
              {noSearchResults ? (
                <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl  px-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-main/10">
                    <SearchIcon />
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-main">No matching tasks</h3>

                  <p className="mt-2 text-sm text-secondary">
                    No tasks found in <span className="font-medium text-main">{status.name}</span>
                  </p>
                </div>
              ) : statusTasksEmpty ? (
                <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl  px-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                    <span className="text-xl">📋</span>
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-main">No tasks yet</h3>

                  <p className="mt-2 text-sm text-secondary">
                    There are no tasks in{" "}
                    <span className="font-medium text-main">{status.name}</span>
                  </p>

                  <p className="mt-1 text-xs text-secondary">Create a new task to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {status.tasks?.map((task, index) => (
                    <div
                      key={task.id + index}
                      className="mb-4 cursor-pointer"
                      onClick={() => handleTaskClick(task.id)}
                    >
                      <TaskCard task={task} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {status.loadingMore && (
        <div>
          <Loader />
        </div>
      )}

      {status.loaded && <div ref={loadMoreRef} className="h-1 mt-10" />}
    </div>
  );
}
