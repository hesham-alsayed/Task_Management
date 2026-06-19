"use client";
import React from "react";
import MenuEpicIcon from "../icons/MenuEpicIcon";
import PlusIcon from "../icons/PlusIcon";
import { useParams, useRouter } from "next/navigation";

export default function EmptyTasks() {
  const params = useParams();
  const projectId = params.projectId as string;
  const router = useRouter();
  return (
    <div className=" px-6 py-3">
      <div className="bg-[#F1F3FF] border-dashed  border-2 border-[#D7E2FF] rounded-lg mt-6 flex flex-col items-center justify-center gap-3 py-4 md:py-10">
        <div className="w-12 rounded-xl bg-[#D7E2FF] h-12 flex items-center justify-center">
          <MenuEpicIcon />
        </div>
        <h1 className="text-[16px] font-medium text-main">
          No tasks have been added to this epic yet
        </h1>
        <div className=" btn-primary w-[140px] flex items-center justify-center gap-2">
          <PlusIcon />
          <button
            onClick={() => router.push(`/project/${projectId}/tasks/new`)}
            className=" hover:cursor-pointer text-sm font-semibold"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
