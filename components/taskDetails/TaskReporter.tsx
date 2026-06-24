"use client";
import { getShortName } from "@/lib/helper/get-shortname";
import { ITaskDetails } from "@/types/task";
import React from "react";

type Props = {
    task : ITaskDetails | null
};
export default function TaskReporter({ task }: Props) {
  return (
    <div className="mt-8">
      <span
        style={{
          lineHeight: "16px",
          letterSpacing: "1px",
        }}
        className="text-[#434654] mb-6 font-bold text-[11px] uppercase"
      >
        Reporter
      </span>

      <div className=" flex items-center gap-2 mt-3 ">
        <div className="w-7 h-7 flex items-center justify-center rounded-xl bg-[#DAE2FF] text-[10px] font-bold">
          {task?.created_by.name ? getShortName(task?.created_by?.name) : ""}
        </div>

        <p className="text-sm font-medium capitalize text-main">{task?.created_by?.name}</p>
      </div>
    </div>
  );
}
