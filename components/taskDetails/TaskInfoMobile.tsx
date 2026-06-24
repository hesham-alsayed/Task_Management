"use client";

import DateIcon from "@/components/icons/DateIcon";
import TaskCreatedAtIcon from "@/components/icons/TaskCreatedAtIcon";
import { formatDate } from "@/lib/helper/formate-date";
import { getShortName } from "@/lib/helper/get-shortname";
import { ITaskDetails } from "@/types/task";

type Props = {
  task: ITaskDetails | null;
};

export default function TaskInfoMobile({ task }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-6 px-8">
      <div className="bg-[#F1F3FF] border border-[#e5e7eb] rounded-lg px-3 py-2">
        <span
          style={{
            lineHeight: "16px",
            letterSpacing: "1px",
          }}
          className="text-[#434654] font-bold text-[11px] uppercase"
        >
          Assignee
        </span>

        <div className="flex items-center gap-2 mt-1.5">
          <div className="w-6 h-6 flex items-center justify-center rounded-xl bg-[#DAE2FF] text-primary text-[9px] font-bold">
            {task?.assignee.name ? getShortName(task?.assignee?.name) : "Un"}
          </div>

          <p className="text-[13px] font-medium capitalize text-main truncate">
            {task?.assignee?.name || "Unassigned"}
          </p>
        </div>
      </div>

      <div className="bg-[#F1F3FF] border border-[#e5e7eb] rounded-lg px-3 py-2">
        <span
          style={{
            lineHeight: "16px",
            letterSpacing: "1px",
          }}
          className="text-[#434654] font-bold text-[11px] uppercase"
        >
          Due Date
        </span>

        <div className="flex items-center gap-2 mt-1.5">
          <DateIcon color="#003D9B" />

          <p className="text-[13px] font-medium capitalize text-main truncate">
            {task?.due_date ? formatDate(task?.due_date) : "No due date"}
          </p>
        </div>
      </div>

      <div className="bg-[#F1F3FF] border border-[#e5e7eb] rounded-lg px-3 py-2">
        <span
          style={{
            lineHeight: "16px",
            letterSpacing: "1px",
          }}
          className="text-[#434654] font-bold text-[11px] uppercase"
        >
          Created By
        </span>

        <div className="flex items-center gap-2 mt-1.5">
          <div className="w-6 h-6 flex items-center justify-center rounded-xl bg-[#DAE2FF] text-primary text-[9px] font-bold">
            {getShortName(task?.created_by?.name || "")}
          </div>

          <p className="text-[13px] font-medium capitalize text-main truncate">
            {task?.created_by?.name}
          </p>
        </div>
      </div>

      <div className="bg-[#F1F3FF] border border-[#e5e7eb] rounded-lg px-3 py-2">
        <span
          style={{
            lineHeight: "16px",
            letterSpacing: "1px",
          }}
          className="text-[#434654] font-bold text-[11px] uppercase"
        >
          Created At
        </span>

        <div className="flex items-center gap-2 mt-1.5">
          <TaskCreatedAtIcon />

          <p className="text-[13px] font-medium capitalize text-main truncate">
            {formatDate(task?.created_at || "")}
          </p>
        </div>
      </div>
    </div>
  );
}
