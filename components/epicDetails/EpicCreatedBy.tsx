import { getShortName } from "@/lib/helper/get-shortname";
import React from "react";

type Props = {
  created_by: {
    name: string;
  };
};
export default function EpicCreatedBy({ created_by }: Props) {
  return (
    <div>
      <span className="uppercase text-[11px] font-bold text-[#4F5F7B]">
        created by
      </span>

      <div className="flex items-center gap-2 mt-2">
        <div className="w-6 h-6 flex items-center justify-center rounded-xl bg-[#DAE2FF] text-[10px] font-bold">
          {getShortName(created_by.name)}
        </div>

        <span className="text-sm font-medium capitalize">
          {created_by.name}
        </span>
      </div>
    </div>
  );
}
