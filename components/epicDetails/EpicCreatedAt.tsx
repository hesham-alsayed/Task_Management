import React from "react";
import DateEpicIcon from "../icons/DateEpicIcon";
import { formatDate } from "@/lib/helper/formate-date";

type Props = {
  created_at: string;
};
export default function EpicCreatedAt({created_at}:Props) {
  return (
    <div>
      <span className="uppercase text-[10px] font-bold text-[#4F5F7B]">
        Created At
      </span>

      <div className="flex items-center gap-2 mt-2">
        <DateEpicIcon />
        <span className="text-sm font-medium">{formatDate(created_at)}</span>
      </div>
    </div>
  );
}
