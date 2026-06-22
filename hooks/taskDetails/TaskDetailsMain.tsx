"use client";

import { setOpenTaskModal, setSelectedTaskId } from "@/app/store/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import useLockBodyScroll from "@/customHooks/useLockBodyScroll";
import { getTaskDetailsAction } from "@/server-actions/tasks/getTaskDetails";
import { ITaskDetails } from "@/types/task";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TaskDetailsModal from "./TaskDetailsModal";
import TaskDetailsModalMobile from "./TaskDetailsModalMobile";

export default function TaskDetailsMain() {
  const { openTaskModal: open, selectedTaskId } = useAppSelector((state) => state.ui);

  const dispatch = useAppDispatch();

  const [task, setTask] = useState<ITaskDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const projectId = params.projectId as string;
  const [isMounted, setIsMounted] = useState(false);

  useLockBodyScroll(open);

  const fetchTaskDetails = async () => {
    try {
      if (!selectedTaskId) return;

      setError(null);

      const data = await getTaskDetailsAction(projectId, selectedTaskId);
      setTask(data[0]);
    } catch {
      setError("Task Id Not Found OR Error in Network");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedTaskId) return;
    fetchTaskDetails();
  }, [selectedTaskId]);

  useEffect(() => {
    if (open) setIsMounted(true);
  }, [open]);

  const handleClose = () => {
    dispatch(setOpenTaskModal(false));

    setTimeout(() => {
      dispatch(setSelectedTaskId(null));
      setIsMounted(false);
    }, 300);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  if (!isMounted && !open) return null;

  return (
    <main>
      <div className="hidden sm:block">
        <TaskDetailsModal
          onClose={handleClose}
          error={error}
          isLoading={loading}
          task={task}
          isOpen={open}
        />
      </div>

      <div className="sm:hidden">
        <TaskDetailsModalMobile
          onClose={handleClose}
          error={error}
          isLoading={loading}
          task={task}
          isOpen={open}
        />
      </div>
    </main>
  );
}
