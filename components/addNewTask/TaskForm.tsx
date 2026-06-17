"use client";

import React from "react";
import StatusSelect from "./StatusSelect";
import AssigneeSelect from "./AssigneeSelect";
import EpicSelect from "./EpicSelect";
import TaskTitleInput from "./TaskTitleInput";
import TaskDateInput from "./TaskDateInput";
import TaskDescription from "./TaskDescription";

import { Controller } from "react-hook-form";
import PlusIcon from "@/components/icons/PlusIcon";
import Loader from "@/components/shared/Loader";
import { useRouter } from "next/navigation";
import TaskActions from "./TaskActions";

type Props = {
  form: any;
  onSubmit: any;
  membersOptions: any[];
  epicOptions: any[];
  selectStyles: any;
  loading: boolean;
  projectId: string;
};

export default function TaskForm({
  form,
  onSubmit,
  membersOptions,
  epicOptions,
  selectStyles,
  loading,
  projectId,
}: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitted },
  } = form;

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <TaskTitleInput
        register={register}
        errors={errors}
        isSubmitted={isSubmitted}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatusSelect control={control} selectStyles={selectStyles} />
        <AssigneeSelect
          control={control}
          membersOptions={membersOptions}
          selectStyles={selectStyles}
        />
      </div>

      <EpicSelect
        control={control}
        epicOptions={epicOptions}
        selectStyles={selectStyles}
      />

      <TaskDateInput register={register} />
      <TaskDescription register={register} />

      <TaskActions loading={loading} projectId={projectId} />
    </form>
  );
}
