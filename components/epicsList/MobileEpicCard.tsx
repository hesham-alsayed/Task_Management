import { Epic } from "@/hooks/useGetAllEpics";
import { getShortName } from "@/lib/helper/get-shortname";
import React from "react";
import ThreeDotsIcon from "../icons/ThreeDotsIcon";
import { formatDate } from "@/lib/helper/formate-date";
import ThreeDotsHorizontal from "../icons/ThreeDotsHorizontalIcon";
import ThreeDotsHorizontalIcon from "../icons/ThreeDotsHorizontalIcon";

type Props = {
  epic: Epic;
};

export default function MobileEpicCard({ epic }: Props) {
  const { epic_id, title, created_at, assignee } = epic;

  return (
    <div className="relative w-full capitalize  mx-auto rounded-lg bg-[#FFFFFF]  p-5">
      <div className="flex items-center justify-between">
        <span className="bg-[#DAE2FF] text-primary px-2 py-1 rounded-xs text-[11px] font-bold ">
          {epic_id}
        </span>

        <button className="text-gray-400">
          <ThreeDotsHorizontalIcon />
        </button>
      </div>

      <h2 className="mt-3 text-[18px] leading-7 font-semibold text-main">
        {title}
      </h2>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-7 h-7 rounded-xl bg-primary text-[#ffffff] flex items-center justify-center font-bold text-[10px]">
            {getShortName(assignee.name)}
          </div>

          <div>
            <p className="text-[12px] font-medium text-main ">
              {assignee.name || "un assigned"}
            </p>
            <p className="text-[10px] text-[#737685] font-normal">Assignee</p>
          </div>
        </div>

        <div className="text-right">
          <p className="uppercase text-[10px] font-bold text-[#737685]">
            Deadline
          </p>

          <p className="text-[15px] font-medium text-main">
            {formatDate(created_at)}
          </p>
        </div>
      </div>
    </div>
  );
}
