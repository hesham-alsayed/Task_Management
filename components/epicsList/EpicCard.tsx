import { Epic } from "@/hooks/useGetAllEpics";
import { getShortName } from "@/lib/helper/get-shortname";
import React from "react";
import CreatedByIcon from "../icons/CreatedByIcon";
import CreatedAtIcon from "../icons/CreatedAtIcon";
import { formatDate } from "@/lib/helper/formate-date";
import ThreeDotsIcon from "../icons/ThreeDotsIcon";

type Props = {
  epic: Epic;
};

export default function EpicCard({ epic }: Props) {
  const { epic_id, title, created_at, created_by, assignee } = epic;

  return (
    <div className="relative bg-[#fffff]  w-full rounded-lg shadow-md p-4 border border-gray-100 space-y-4">
      <div className="absolute left-0 top-0 h-full w-1 bg-darkgreen rounded-l-2xl" />
      <div className="flex items-center justify-between">
        <span className="bg-maingreen px-5 py-1.5 text-darkgreen text-xs font-bold  rounded-md">
          {epic_id}
        </span>

        <button>
          <ThreeDotsIcon />
        </button>
      </div>

      <h2 className="text-[20px] font-semibold capitalize text-main mt-4 ">
        {title}
      </h2>

      <div className="flex items-center gap-3 mt-5">
        <div className="w-10 h-10 rounded-xl bg-maingreen text-darkgreen flex items-center justify-center font-semibold">
          {getShortName(assignee.name)}
        </div>

        <div>
          <p className=" capitalize text-[12px] font-medium text-[#434654]">
            Assignee
          </p>
          <p className=" capitalize font-semibold text-main text-sm">
            {assignee.name || "un assigned"}{" "}
          </p>
        </div>
      </div>

      {/* <div className="my-5 h-px bg-gray-100" /> */}

      <div className="flex items-center pt-4 border-t mt-4 border-t-[#F1F3FF] justify-between ">
        <div className="flex items-center gap-2">
          <span>
            <CreatedByIcon />
          </span>
          <span className="text-[11px] text-[#434654CC] font-normal">
            Created by:{" "}
            <span className="text-main capitalize text-[11px] font-sdemibold">
              {created_by.name}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span>
            <CreatedAtIcon />
          </span>
          <span className="text-[11px] font-normal text-[#434654CC]">
            {formatDate(created_at)}
          </span>
        </div>
      </div>
    </div>
  );
}
