"use client";
import { formatDate } from "@/lib/helper/formate-date";
import { ITaskDetails } from "@/types/task";
import React from "react";

type Props = {
  task: ITaskDetails | null;
};
export default function TaskDates({ task }: Props) {
  return (
    <div className="border-t-[#C3C6D633] pt-6 border-t mt-6 space-y-6">
      <div className="flex items-center justify-between gap-1">
        <span className="text-[12px] text-[#434654] font-normal capitalize">due date</span>
        <span className="text-sm text-main font-medium ">
          {task?.due_date ? formatDate(task?.due_date) : "No Due Date"}
        </span>
      </div>
      <div className="flex items-center justify-between gap-1">
        <span className="text-[12px] text-[#434654] font-normal capitalize">created at</span>
        <span className="text-sm text-main font-medium ">{formatDate(task?.created_at || "")}</span>
      </div>
    </div>
  );
}
