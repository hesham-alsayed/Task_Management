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
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setOpenTaskModal, setSelectedTaskId } from "@/app/store/features/ui/uiSlice";
import Loader from "@/components/shared/Loader";
import ButtonAddNewTask from "@/components/tasks/ButtonAddNewTask";
import SearchEmptyState from "@/components/shared/SearchEmptyState";
import SearchErrorState from "@/components/shared/SearchErrorState";

export default function Page() {
  const { initialProject } = useProjectForm();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") as "board" | "list";
  const { globalBoardData: boardData, globalListData: listData } = useAppSelector(
    (state) => state.tasks
  );
  console.log(boardData);
  const {
    initialRender,
    error: boardError,
    loadStatusTasks,
    loadMoreStatusTasks,
    pagination,
    setBoardData,
  } = useProjectTasks();
  const {
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
  const showDesktopAddButton = currentView === "list";

  const searchTitle = searchParams.get("title");
  const noSearchMatchingList = listData.length === 0 && searchTitle && status === "success";
  const isErrorinSearchList = status === "error" && searchTitle;
  const isErrorinBoardList = boardError && searchTitle;

  const dispatch = useAppDispatch();
  const handleTaskClick = (taskId: string) => {
    dispatch(setSelectedTaskId(taskId));
    dispatch(setOpenTaskModal(true));
  };

  if ((currentView === "board" && initialRender) || !initialProject) {
    return <TasksBoardViewSkeleton />;
  }

  if (currentView === "list" && listData.length === 0 && status === "loading") {
    return (
      <>
        <TasksListViewSkeleton />
        {showDesktopAddButton && <ButtonAddNewTask projectId={initialProject?.id || ""} />}
      </>
    );
  }
  if (currentView === "list" && listData.length > 0 && status === "loading") {
    return (
      <>
        <TasksListViewSkeleton showHeader={false} />
        {showDesktopAddButton && <ButtonAddNewTask projectId={initialProject?.id || ""} />}
      </>
    );
  }

  if (currentView === "list" && isErrorinSearchList) {
    return (
      <>
        <HeaderTasks
          projectId={initialProject?.id || ""}
          projectName={initialProject?.name || ""}
        />

        <div className="mt-20">
          <SearchErrorState searchValue={searchTitle} error={error || "Failed to search tasks"} />
        </div>

        {showDesktopAddButton && <ButtonAddNewTask projectId={initialProject?.id || ""} />}
      </>
    );
  }

  if (currentView === "board" && isErrorinBoardList) {
    return (
      <>
        <HeaderTasks
          projectId={initialProject?.id || ""}
          projectName={initialProject?.name || ""}
        />

        <div className="mt-20">
          <SearchErrorState
            searchValue={searchTitle}
            error={boardError || "Failed to search tasks"}
          />
        </div>
      </>
    );
  }

  if (status === "error" || boardError) {
    return (
      <>
        <ErrorNetworkState
          error={error || boardError}
          retryFunction={retylLoadTasks}
          isLoading={false}
        />

        {showDesktopAddButton && <ButtonAddNewTask projectId={initialProject?.id || ""} />}
      </>
    );
  }

  if (status === "success" && listData.length === 0 && !searchTitle) {
    return (
      <>
        <TasksEmptyState projectId={initialProject?.id} />

        {showDesktopAddButton && <ButtonAddNewTask projectId={initialProject?.id || ""} />}
      </>
    );
  }

  return (
    <main className="max-lg:mx-6">
      <HeaderTasks projectId={initialProject?.id || ""} projectName={initialProject?.name || ""} />

      {currentView === "board" ? (
        <TasksBoardView
          boardData={boardData}
          loadStatusTasks={loadStatusTasks}
          loadMoreStatusTasks={loadMoreStatusTasks}
          setBoardData={setBoardData}
        />
      ) : (
        <>
          {noSearchMatchingList ? (
            <div className="mt-20">
              <SearchEmptyState searchValue={searchTitle} typeData="tasks" />
            </div>
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
              {showDesktopAddButton && <ButtonAddNewTask projectId={initialProject?.id || ""} />}
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
        </>
      )}
    </main>
  );
}
