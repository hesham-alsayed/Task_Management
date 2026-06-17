"use client";

import React from "react";
import { useParams } from "next/navigation";

import { useProjectForm } from "@/hooks/useProjectForm";
import { useAddNewTask } from "@/hooks/useAddNewTask";

import HeaderNewTask from "./HeaderNewTask";
import AddNewTaskSkeleton from "../skeleton/AddNewTaskSkeleton";
import TaskForm from "./TaskForm";

export default function AddNewTaskMain() {
  const params = useParams();
  const projectId = params.projectId as string;

  const { initialProject } = useProjectForm();

  const { membersOptions, epicOptions, loadingEpics, form, onSubmit, loading } =
    useAddNewTask();

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: "#d7e2ff",
      borderColor: "#E5E7EB",
      minHeight: "44px",
      boxShadow: "none",
    }),
    placeholder: (b: any) => ({ ...b, color: "#000" }),
    singleValue: (b: any) => ({ ...b, color: "#000" }),
    input: (b: any) => ({ ...b, color: "#000" }),
  };

  if (loadingEpics) return <AddNewTaskSkeleton />;

  return (
    <div className="max-w-235 sm:mx-6 lg:mx-auto">
      <HeaderNewTask
        projectId={initialProject?.id || ""}
        projectName={initialProject?.name || ""}
      />

      <div className="sm:bg-white p-6 rounded-lg mt-5 sm:mt-10">
        <TaskForm
          form={form}
          onSubmit={onSubmit}
          membersOptions={membersOptions}
          epicOptions={epicOptions}
          selectStyles={selectStyles}
          loading={loading}
          projectId={projectId}
        />
      </div>
    </div>
  );
}
