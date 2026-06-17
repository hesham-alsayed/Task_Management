"use client";

import React from "react";

type Props = {
  register: any;
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