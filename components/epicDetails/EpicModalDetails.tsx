"use client";

import { setOpenEpicModal, setSelectedEpicId } from "@/app/store/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import useLockBodyScroll from "@/customHooks/useLockBodyScroll";
import { getOneEpicAction } from "@/server-actions/epics/getOneEpic";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import HeaderEpicDetails from "./HeaderEpicDetails";
import EpicMainInfo from "./EpicMainInfo";
import EmptyTasks from "./EmptyTasks";
import EpicTasksList from "./EpicTasksList";
import ErrorTasksState from "./ErrorTasksState";

import { Epic } from "@/hooks/useGetAllEpics";
import { getAllEpicTasksAction } from "@/server-actions/tasks/getAllEpicTasks";
import EpicDetailsModalSkeleton from "../skeleton/EpicDetailsModalSkeleton";
import { useEpicForm } from "@/hooks/useEpicForm";
import { FormProvider } from "react-hook-form";
import { useMembersProject } from "@/hooks/useMembersProject";

export type UserInfo = {
  sub: string;
  name: string;
  email: string;
  department: string | null;
};

export type EpicDetails = {
  id: string;
  epic_id: string;
  project_id: string;
  title: string;
  description: string;
  deadline: string;
  created_at: string;
  assignee: UserInfo;
  created_by: UserInfo;
};

export type Task = {
  id: string;
  task_id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  epic_id: string | null;
  created_at: string;
  status: string;
  assignee: {
    id: string;
    name: string;
    email: string;
    department: string | null;
  } | null;
};

export default function EpicModalDetails() {
  const params = useParams();
  const projectId = params.projectId as string;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { openEpicModal: open, selectedEpicId } = useAppSelector((state) => state.ui);
  const { fetching, epic, fetchEpic, form } = useEpicForm();
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data:members } = useMembersProject();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isError = !!error;
  const isEmpty = !loading && !error && tasks.length === 0;
  const hasTasks = !loading && !error && tasks.length > 0;
  useLockBodyScroll(open);

  const fetchEpicTasks = async () => {
    try {
      if (!selectedEpicId) return;
      setLoading(true);
      setError(null);
      setTasks([]);

      const res = await getAllEpicTasksAction(selectedEpicId);

      setTasks(res || []);
    } catch (err: any) {
      setError(err?.message || "Error fetching tasks from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedEpicId) return;
    fetchEpic();
    fetchEpicTasks();
  }, [selectedEpicId]);

  const handleClose = () => {
    dispatch(setSelectedEpicId(null));
    dispatch(setOpenEpicModal(false));
  };

  if (!open || !epic) return null;

  if (!epic || loading || fetching || !members) {
    return <EpicDetailsModalSkeleton />;
  }

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center">
      <div onClick={handleClose} className="absolute inset-0 bg-[#041B3C33] backdrop-blur-[2px]" />

      <div className="relative z-10 mx-4 w-full max-w-2xl max-h-[95vh] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">
        <div className="overflow-y-auto">
          <FormProvider {...form}>
            <HeaderEpicDetails />
            <EpicMainInfo members={members} epic={epic} />
          </FormProvider>
          <div className=" mx-6 hidden sm:flex items-center justify-between ">
            <h1 className=" text-[11px] md:text-[18px] font-semibold text-[#4F5F7B] md:text-main">
              Tasks
            </h1>
            <div
              onClick={() => router.push(`/project/${projectId}/tasks/new`)}
              className="hover:cursor-pointer hidden md:flex items-center gap-2 text-sm text-primary font-semibold"
            >
              <span>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.5 6H0V4.5H4.5V0H6V4.5H10.5V6H6V10.5H4.5V6Z" fill="#003D9B" />
                </svg>
              </span>
              <span>Add Task</span>
            </div>
          </div>

          <div className=" mx-6 sm:hidden flex items-center justify-between ">
            <h1 className=" text-[11px] md:text-[18px] font-semibold text-[#4F5F7B] md:text-main">
              Tasks
            </h1>

            <div className=" uppercase rounded-2xl md:hidden text-[10px] px-3 py-1 font-bold text-[#434654] bg-[#E0E8FF]">
              {tasks.length} tasks
            </div>
          </div>
          {isError && <ErrorTasksState error={error!} />}

          {isEmpty && <EmptyTasks />}

          {hasTasks && <EpicTasksList tasks={tasks} />}
        </div>
      </div>
    </div>
  );
}
