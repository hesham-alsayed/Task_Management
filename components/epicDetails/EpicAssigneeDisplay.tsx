"use client";

import React from "react";
import UnAssignedIcon from "../icons/UnAssignedIcon";
import DropDownIcon from "../icons/DropDownIcon";
import { getShortName } from "@/lib/helper/get-shortname";

type Props = {
  value: string | null;
  label?: string;
  onOpen: () => void;
};

export default function EpicAssigneeDisplay({ value, label, onOpen }: Props) {
  return (
    <div onClick={onOpen} className="flex items-center gap-2 cursor-pointer">
      {!value ? (
        <>
          <span className="bg-[#CDDDFF] p-1 rounded-xl">
            <UnAssignedIcon />
          </span>

          <span className="text-sm font-medium text-[#4F5F7B]">Unassigned</span>
        </>
      ) : (
        <>
          <div className="w-6 h-6 flex items-center justify-center rounded-xl bg-[#CDDDFF] text-[10px] font-bold">
            {getShortName(label || "")}
          </div>

          <span className="text-sm font-medium text-main truncate">{label}</span>
        </>
      )}

      <DropDownIcon />
    </div>
  );
}
