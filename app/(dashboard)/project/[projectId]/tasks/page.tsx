"use client";

import ErrorNetworkState from "@/components/projects/ErrorNetworkState";
import TasksListViewSkeleton from "@/components/skeleton/TasksListViewSkeleton";
import HeaderTasks from "@/components/tasks/HeaderTasks";
import TasksBoardView from "@/components/tasks/TasksBoardView";
import TasksEmptyState from "@/components/tasks/TasksEmptyState";
import TasksListView from "@/components/tasks/TasksListView";
import { useProjectForm } from "@/hooks/useProjectForm";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import { useSearchParams } from "next/navigation";
import TasksBoardViewSkeleton from "@/components/skeleton/TasksBoardViewSkeleton";
import { useEffect } from "react";
import TaskCardMobile from "@/components/tasks/TaskCardMobile";
import { Task } from "@/components/epicDetails/EpicModalDetails";
import { useAppDispatch } from "@/app/store/hooks";
import { setOpenTaskModal, setSelectedTaskId } from "@/app/store/features/ui/uiSlice";
import Loader from "@/components/shared/Loader";

export default function Page() {
  const { initialProject } = useProjectForm();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") as "board" | "list";
  const {
    boardData,

    initialRender,
    error: boardError,
    loadStatusTasks,
    loadMoreStatusTasks,
    pagination,
  } = useProjectTasks();
  const {
    data: listData,
    hasNextPage,
    hasPrevPage,
    totalCount,
    totalPages,
    status,
    loadMoreRef,
    loadingMore,
    page,
    nextPage,
    prevPage,
    error,

    retryGetData: retylLoadTasks,
  } = pagination;
  const dispatch = useAppDispatch();
  const handleTaskClick = (taskId: string) => {
    dispatch(setSelectedTaskId(taskId));
    dispatch(setOpenTaskModal(true));
  };
  if (currentView === "board" && !initialRender) {
    return <TasksBoardViewSkeleton />;
  }

  if (currentView === "list" && listData.length === 0 && status === "loading") {
    return <TasksListViewSkeleton />;
  }
  if (currentView === "list" && listData.length > 0 && status === "loading") {
    return <TasksListViewSkeleton showHeader={false} />;
  }

  if (status === "error" || boardError) {
    return (
      <ErrorNetworkState
        error={error || boardError}
        retryFunction={retylLoadTasks}
        isLoading={false}
      />
    );
  }

  if (status === "success" && listData.length === 0) {
    return <TasksEmptyState projectId={initialProject?.id} />;
  }

  return (
    <main className="max-lg:mx-6">
      <HeaderTasks projectId={initialProject?.id || ""} projectName={initialProject?.name || ""} />

      {currentView === "board" ? (
        <TasksBoardView
          boardData={boardData}
          loadStatusTasks={loadStatusTasks}
          loadMoreStatusTasks={loadMoreStatusTasks}
        />
      ) : (
        <>
          <div className="hidden sm:block">
            <TasksListView
              tasks={listData}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              totalCount={totalCount}
              totalPages={totalPages}
              page={page}
              handleNextPage={nextPage}
              handlePrevPage={prevPage}
            />
          </div>
          <div className="sm:hidden flex flex-col gap-6 w-full mt-6">
            {listData.map((task: Task) => (
              <div
                className="hover:cursor-pointer"
                key={task.id}
                onClick={() => handleTaskClick(task.id)}
              >
                <TaskCardMobile task={task} />
              </div>
            ))}

            <div ref={loadMoreRef} className="h-20 flex items-center justify-center sm:hidden">
              {loadingMore && (
                <div className="flex items-center gap-2">
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
