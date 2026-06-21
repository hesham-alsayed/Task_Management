"use client";
import React from "react";
import { Task } from "../epicDetails/EpicModalDetails";
import StatusBadge from "./StatusBadge";
import { getShortName } from "@/lib/helper/get-shortname";
import { formatDate } from "@/lib/helper/formate-date";
import ThreeDotsIcon from "../icons/ThreeDotsIcon";

type Props = {
  task: Task;
};
export default function TaskCardMobile({ task }: Props) {
  const { title, due_date, assignee, status, task_id } = task;
  return (
    <div className="bg-[#FFFFFF] rounded-xl p-4 shadow-sm  flex flex-col">
      <div className="">
        <div className="flex items-start justify-between">
          <p className="text-[#43465480] text-[11px] font-bold">{task_id}</p>
          <StatusBadge status={status} />
        </div>

        <h3 className=" font-medium text-main text-[18px]">{title}</h3>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DAE2FF] text-main text-[11px] font-bold">
            {assignee?.name ? getShortName(assignee?.name) : "UN"}
          </div>

          <div>
            <p className="text-[#434654B2] text-[11px] font-bold uppercase">Due Date</p>

            <p className="text-[13px] font-medium text-slate-900">
              {due_date ? formatDate(due_date) : "NO DUE DATE"}
            </p>
          </div>
        </div>

        <button>
          <ThreeDotsIcon />
        </button>
      </div>
    </div>
  );
}
