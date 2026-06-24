"use client";

import { ITaskDetails } from "@/types/task";

type Props = {
  task: ITaskDetails | null;
};

export default function TaskDescriptionMobile({ task }: Props) {
  return (
    <div className="px-8 my-4">
      <span className="text-sm font-bold text-[#737685] uppercase">Description</span>
      <div className="bg-[#FFFFFF] min-h-[160px] mt-4 rounded-lg p-4 border-[#434654] mt-1 text-[#434654] text-sm font-normal border-[#C3C6D61A] ">
        {task?.description || "No Description Found"}
      </div>
    </div>
  );
}
