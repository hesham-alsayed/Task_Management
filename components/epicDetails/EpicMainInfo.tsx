import React from "react";
import { EpicDetails } from "./EpicModalDetails";
import { getShortName } from "@/lib/helper/get-shortname";
import DateIcon from "../icons/DateIcon";
import { formatDate } from "@/lib/helper/formate-date";
import DateEpicIcon from "../icons/DateEpicIcon";
import UnAssignedIcon from "../icons/UnAssignedIcon";

type Props = {
  epic: EpicDetails;
};
export default function EpicMainInfo({ epic }: Props) {
  const { description, created_by, assignee, deadline, created_at } = epic;
  return (
    <div className="pt-3 p-6">
      <div className="space-y-4">
        <p className=" mt-2 md:hidden uppercase text-[11px] font-bold text-[#4F5F7B]">
          Description
        </p>
        <p className="text-[16px] font-normal text-[#041B3CCC]">
          {description || "No description provided"}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-6 mt-4">
        <div>
          <span className="uppercase text-[11px] font-bold text-[#4F5F7B] md:text-[#041B3C66]">
            created by
          </span>
          <div className="flex items-center gap-2 mt-2">
            <div className=" w-6 h-6  md:w-7 md:h-7 flex items-center justify-center rounded-xl bg-[#DAE2FF] md:bg-primary  text-[10px] font-bold text-[#001848] md:text-[#FFFFFF]">
              {getShortName(created_by.name)}
            </div>
            <span className="text-sm font-medium capitalize text-main">
              {created_by.name}
            </span>
          </div>
        </div>

        <div>
          <span className="uppercase text-[11px] font-bold text-[#4F5F7B] md:text-[#041B3C66]">
            Assignee
          </span>
          <div className="flex items-center gap-2 mt-2">
            {assignee.name ? (
              <>
                <div className="w-7 h-7 flex items-center justify-center rounded-xl bg-[#CDDDFF]  text-[10px] font-bolf text-[#001848] md:text-[#51617E]">
                  {getShortName(assignee.name)}
                </div>
                <span className="text-sm font-medium capitalize text-main">
                  {assignee.name}
                </span>
              </>
            ) : (
              <div className=" rounded-full flex items-center gap-3">
                <span className="bg-[#CDDDFF] p-1 rounded-xl">
                  <UnAssignedIcon />
                </span>
                <span className="text-sm font-medium text-[#4F5F7B]">
                  Unassigned
                </span>
              </div>
            )}
          </div>
        </div>
        <div>
          <span className="uppercase text-[10px] font-bold text-[#4F5F7B] md:text-[#041B3C66]">
            Deadline
          </span>
          <div className="flex items-center gap-2 mt-2">
            <div>
              <DateEpicIcon />
            </div>
            <span className="text-sm font-medium capitalize text-main">
              {formatDate(deadline)}
            </span>
          </div>
        </div>
        <div>
          <span className="uppercase text-[10px] font-bold text-[#4F5F7B] md:text-[#041B3C66]">
            Created At
          </span>
          <div className="flex items-center gap-2 mt-2">
            <div>
              <DateEpicIcon />
            </div>
            <span className="text-sm font-medium capitalize text-main">
              {formatDate(created_at)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
