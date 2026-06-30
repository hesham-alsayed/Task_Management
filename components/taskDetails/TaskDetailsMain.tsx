"use client";

import { setOpenTaskModal, setSelectedTaskId } from "@/app/store/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import useLockBodyScroll from "@/customHooks/useLockBodyScroll";
import  { useEffect, useState } from "react";
import TaskDetailsModal from "./TaskDetailsModal";
import TaskDetailsModalMobile from "./TaskDetailsModalMobile";
import { useTaskForm } from "@/hooks/useTaskForm";
import { FormProvider } from "react-hook-form";

export default function TaskDetailsMain() {
  const { openTaskModal: open, selectedTaskId } = useAppSelector((state) => state.ui);
  const {
    task,
    fetchTaskDetails,
    loading,
    error,
    form,
    updateField,
    loadingUpdate,
    epics,
    membersOptions,
  } = useTaskForm();
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useLockBodyScroll(open);

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
      <FormProvider {...form}>
        <div className="hidden sm:block">
          <TaskDetailsModal
            onClose={handleClose}
            error={error}
            isLoading={loading}
            task={task}
            isOpen={open}
            loadingUpdate={loadingUpdate}
            updateField={updateField}
            epics={epics}
            membersOptions={membersOptions}
          />
        </div>

        <div className="sm:hidden">
          <TaskDetailsModalMobile
            onClose={handleClose}
            error={error}
            isLoading={loading}
            task={task}
            isOpen={open}
            epics={epics}
            membersOptions={membersOptions} 
            updateField={updateField}
          />
        </div>
      </FormProvider>
    </main>
  );
}
