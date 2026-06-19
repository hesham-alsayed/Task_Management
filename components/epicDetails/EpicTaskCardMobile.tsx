"use client";

import { getShortName } from "@/lib/helper/get-shortname";
import { Task } from "./EpicModalDetails";
import UnAssignedIcon from "../icons/UnAssignedIcon";
import DateEpicIcon from "../icons/DateEpicIcon";
import { formatDate } from "@/lib/helper/formate-date";
import { formatEpicTitle } from "@/lib/helper/formatEpicTitle";
import ThreeDotsIcon from "../icons/ThreeDotsIcon";
import ExclamationIcon from "../icons/ExclamationIcon";

type Props = {
  task: Task;
};
export default function EpicTaskCardMobile({ task }: Props) {
  const isOverdue = task.due_date && new Date(task.due_date) < new Date();
  return (
    <div className="p-4 flex flex-col border border-[#E8EDFF] mb-4 shadow rounded-lg space-y-4  ">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[14px] text-main font-semibold ">
          {formatEpicTitle(task.title, 35)}
        </h1>
        <span>
          <ThreeDotsIcon />
        </span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center text-xs justify-center rounded-xl bg-[#CDDDFF] text-main">
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

        {isOverdue ? (
          <div className=" flex items-center gap-2">
            <ExclamationIcon />
            <span className="text-[12px] uppercase font-bold text-[#BA1A1A]">
              Overdue
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <DateEpicIcon />
            <span className="text-[12px] font-bold text-[#434654B2]">
              {task.due_date ? formatDate(task.due_date) : "No Due Date"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
