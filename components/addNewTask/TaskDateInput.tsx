"use client";

import { NewTaskFormData } from "@/schema/task.schema";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<NewTaskFormData>;
};

export default function TaskDateInput({ register }: Props) {
  return (
    <div className="space-y-2">
      <label htmlFor="duedate" className="label-form">
        Due date
      </label>

      <input
        {...register("due_date")}
        type="date"
        id="duedate"
        className="input-form"
        onFocus={(e) => e.currentTarget.showPicker?.()}
      />
    </div>
  );
}