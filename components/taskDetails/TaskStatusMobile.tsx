"use client";

import CheckStatusIcon from "@/components/icons/CheckStatusIcon";
import TaskDetailsIcon from "@/components/icons/TaskDetailsIcon";
import { statusStylesBadge } from "@/lib/constant";
import { ITaskDetails } from "@/types/task";

type Props = {
  task: ITaskDetails | null;
};

export default function TaskStatusMobile({ task }: Props) {
  const status =
    statusStylesBadge[task?.status as keyof typeof statusStylesBadge] ?? statusStylesBadge.TO_DO;

  return (
    <div className="mt-1 px-8">
      <h1
        style={{
          lineHeight: "30px",
        }}
        className="text-[#041B3C] text-[24px] text-main font-semibold "
      >
        {task?.title}
      </h1>
      <div className="flex items-center gap-2 mt-3">
        <div
          style={{
            backgroundColor: status.bg,
            color: status.text,
          }}
          className="bg-[#82F9BE] px-4 text-[11px] font-bold text-[#002113] flex items-center justify-center uppercase gap-2 py-1  rounded-full"
        >
          <CheckStatusIcon color={status.text} /> {task?.status.split("_").join(" ")}
        </div>

        <div className="bg-[#CDDDFF] px-4 text-[11px] font-bold text-[#374763] flex items-center justify-center uppercase gap-2 py-1 rounded-full">
          <TaskDetailsIcon /> {task?.epic?.epic_id}
        </div>
      </div>
    </div>
  );
}
