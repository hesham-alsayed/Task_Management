import { getShortName } from "@/lib/helper/get-shortname";
import { ITaskDetails } from "@/types/task";
import React from "react";

type Props = {
  task: ITaskDetails | null;
};
export default function TaskAssignee({ task }: Props) {
  return (
    <div className="mt-8">
      <span
        style={{
          lineHeight: "16px",
          letterSpacing: "1px",
        }}
        className="text-[#434654] mb-6 font-bold text-[11px] uppercase"
      >
        Assignee
      </span>

      <div className="bg-[#FFFFFF] p-2 mt-3 rounded-xl flex items-center gap-2 ">
        <div className="w-7 h-7 flex items-center justify-center rounded-xl bg-[#DAE2FF] text-[10px] font-bold">
          {task?.assignee.name ? getShortName(task?.assignee?.name) : "Un"}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold capitalize text-main">
            {task?.assignee?.name || "unAssigneed"}
          </p>
          <p className="text-[10px] font-normal text-[#434654] capitalize">
            {task?.assignee?.department ? task?.assignee.department : "not Deprtment yet"}
          </p>
        </div>
      </div>
    </div>
  );
}
