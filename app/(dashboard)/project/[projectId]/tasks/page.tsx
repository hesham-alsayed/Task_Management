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

export default function Page() {
  const { initialProject } = useProjectForm();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") as "board" | "list";
  const { boardData, listData, length, boardStatus, listStatus, error, retylLoadTasks } =
    useProjectTasks();

  const dispatch = useAppDispatch();
  const handleTaskClick = (taskId: string) => {
    dispatch(setSelectedTaskId(taskId));
    dispatch(setOpenTaskModal(true));
  };
  if (currentView === "board" && boardStatus === "loading") {
    return <TasksBoardViewSkeleton />;
  }

  if (currentView === "list" && listStatus === "loading") {
    return <TasksListViewSkeleton />;
  }
  if (status === "error") {
    return <ErrorNetworkState error={error} retryFunction={retylLoadTasks} isLoading={false} />;
  }

  if (status === "success" && length === 0) {
    return <TasksEmptyState projectId={initialProject?.id} />;
  }

  return (
    <main className="max-lg:mx-6">
      <HeaderTasks projectId={initialProject?.id || ""} projectName={initialProject?.name || ""} />

      {currentView === "board" ? (
        <TasksBoardView boardData={boardData} />
      ) : (
        <>
          <div className="hidden sm:block">
            <TasksListView tasks={listData} />
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
          </div>
        </>
      )}
    </main>
  );
}
