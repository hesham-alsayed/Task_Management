"use client";
import React from "react";
import HeaderNewEpics from "./HeaderNewEpics";
import NewEpicsForm from "./NewEpicForm";
import { useProjectForm } from "@/hooks/useProjectForm";
import HeaderNewEpicsSkeleton from "../skeleton/HeaderNewEpicSkeleton";
import HeaderNewEpicSkeleton from "../skeleton/HeaderNewEpicSkeleton";
import { useMembersProject } from "@/hooks/useMembersProject";
import { useEpicForm } from "@/hooks/useEpicForm";

export default function NewEpicMain() {
  const { initialProject } = useProjectForm();
  const { form, onSubmit, loading, handleResetForm } = useEpicForm();
  const { data } = useMembersProject();
  return (
    <main className="mx-auto md:mx-6  max-w-[896px] max-md:mx-5 max-sm:mt-15 max-lg:lg:mx-20 ">
      {!initialProject ? (
        <HeaderNewEpicSkeleton />
      ) : (
        <HeaderNewEpics
          projectId={initialProject?.id || ""}
          projectName={initialProject?.name || ""}
        />
      )}
      <NewEpicsForm
        handleResetForm={handleResetForm}
        form={form}
        onSubmit={onSubmit}
        loading={loading}
        members={data}
      />
    </main>
  );
}
