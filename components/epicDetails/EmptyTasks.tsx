import React from "react";
import MenuEpicIcon from "../icons/MenuEpicIcon";
import PlusIcon from "../icons/PlusIcon";

export default function EmptyTasks() {
  return (
    <div className=" px-6 py-3">
      <div className="flex items-center justify-between ">
        <h1 className=" text-[11px] md:text-[18px] font-semibold text-[#4F5F7B] md:text-main">
          Tasks
        </h1>
        <div className=" hidden md:flex items-center gap-2 text-sm text-primary font-semibold ">
          <span>
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 6H0V4.5H4.5V0H6V4.5H10.5V6H6V10.5H4.5V6Z"
                fill="#003D9B"
              />
            </svg>
          </span>
          <span>Add Task</span>
        </div>
        <div className=" uppercase rounded-2xl md:hidden text-[10px] px-3 py-1 font-bold text-[#434654] bg-[#E0E8FF]">
          0 tasks
        </div>
      </div>

      <div className="bg-[#F1F3FF] border-dashed  border-2 border-[#D7E2FF] rounded-lg mt-6 flex flex-col items-center justify-center gap-3 py-4 md:py-10">
        <div className="w-12 rounded-xl bg-[#D7E2FF] h-12 flex items-center justify-center">
          <MenuEpicIcon />
        </div>
        <h1 className="text-[16px] font-medium text-main">
          No tasks have been added to this epic yet
        </h1>
        <button className=" btn-primary w-[140px] flex items-center justify-center gap-2">
          <PlusIcon />
          <span className="text-sm font-semibold">Add Task</span>
        </button>
      </div>
    </div>
  );
}
