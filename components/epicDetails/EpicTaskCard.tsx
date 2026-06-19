"use client";

import { getShortName } from "@/lib/helper/get-shortname";
import { Task } from "./EpicModalDetails";
import { formatDate } from "@/lib/helper/formate-date";
import CheckTaskICon from "../icons/CheckTaskICon";
import UnAssignedIcon from "../icons/UnAssignedIcon";
import { formatEpicTitle } from "@/lib/helper/formatEpicTitle";

type Props = {
  task: Task;
};
export default function EpicTaskCard({ task }: Props) {
  return (
    <div className="flex items-center justify-between px-6 py-4  ">
      <div className="flex items-center gap-4">
        <div>
          <CheckTaskICon />
        </div>
        <div className="space-y-1 ">
          <h1 className="text-[16px] text-main font-medium ">{formatEpicTitle(task.title, 60)}</h1>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center text-xs justify-center rounded-xl bg-[#CDDDFF] text-main">
              {task?.assignee?.name ? (
                getShortName(task?.assignee?.name)
              ) : (
                <UnAssignedIcon />
              )}
            </div>
            <span className="text-[#041B3C99] text-[12px] font-normal">
              {task.assignee?.name || "un assigned"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="uppercase text-[10px] font-bold text-[#041B3C66]">
          DueDate
        </span>
        <span className="text-[12px] font-medium  ">
          {task.due_date ? formatDate(task.due_date) : "No Due Date"}
        </span>
      </div>
    </div>
  );
}
