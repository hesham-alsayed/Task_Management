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

export default function Page() {
  const { initialProject } = useProjectForm();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") as "board" | "list";
  const { formattedData, status, tasks, error, retryLoading, retylLoadTasks } =
    useProjectTasks();

  if (status === "loading" || retryLoading) {
    return currentView === "list" ? (
      <TasksListViewSkeleton />
    ) : (
      <TasksBoardViewSkeleton />
    );
  }

  if (status === "error") {
    return (
      <ErrorNetworkState
        error={error}
        retryFunction={retylLoadTasks}
        isLoading={retryLoading}
      />
    );
  }

  if (status === "success" && tasks.length === 0) {
    return <TasksEmptyState projectId={initialProject?.id} />;
  }

  return (
    <>
      <HeaderTasks
        projectId={initialProject?.id || ""}
        projectName={initialProject?.name || ""}
      />

      {currentView === "board" ? (
        <TasksBoardView formattedData={formattedData} />
      ) : (
        <TasksListView tasks={tasks} />
      )}
    </>
  );
}
