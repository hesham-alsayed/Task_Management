"use client";

import React, { useMemo } from "react";
import { Task } from "../epicDetails/EpicModalDetails";

import DateIcon from "../icons/DateIcon";
import UnAssignedIcon from "../icons/UnAssignedIcon";
import WarningIcon from "../icons/WarningIcon";

import { getShortName } from "@/lib/helper/get-shortname";
import { formatEpicTitle } from "@/lib/helper/formatEpicTitle";
import { getDueDateStatus } from "@/lib/helper/check-dueDate";
import { formatMonthDay } from "@/lib/helper/formate-date";

type Props = {
  task: Task;
};

type DueStatus = "past" | "today" | "future" | "no-date";

export default function TaskCard({ task }: Props) {
  const { title, due_date, assignee, status } = task;

  const statusDate = getDueDateStatus(due_date) as DueStatus;

  const isPast = statusDate === "past";
  const isToday = statusDate === "today";
  const isNoDate = statusDate === "no-date";

  const isBlocked = status === "BLOCKED";
  const isInProgress = status === "IN_PROGRESS";

  const isOverdue = isPast;

  const isDone = status === "DONE";
  const dateLabel = useMemo(() => {
    if (isToday) return "TODAY";
    if (isNoDate) return "NO DUE DATE";
    if (due_date) return formatMonthDay(due_date);
    return "NO DUE DATE";
  }, [isToday, isNoDate, due_date]);

  const dateColor = useMemo(() => {
    if (isToday) return "#003D9B";
    if (isDone) return "#16A34A";
    return "#94A3B8";
  }, [isToday, isDone]);

  return (
    <div
      className={` ${isBlocked ? "bg-[#FFDAD633] border-[#BA1A1A1A]" : "bg-white"} flex flex-col justify-between h-[114px]  border-gray-100 relative rounded-lg p-4 border transition-all
      `}
    >
      {isInProgress && (
        <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-l-2xl" />
      )}

      <h1 className="text-main text-sm font-medium">{formatEpicTitle(title, 70)}</h1>

      <div className="flex items-center justify-between mt-4">
        {isOverdue ? (
          <div className="flex items-center gap-2">
            <WarningIcon />
            <span className="text-[#BA1A1A] uppercase font-bold text-[10px]">DELAYED</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <DateIcon color={dateColor} />

            <span
              className={`uppercase font-bold text-[10px] ${
                isToday ? "text-[#003D9B]" : isDone ? "text-[#16A34A]" : "text-[#94A3B8]"
              }`}
            >
              {dateLabel}
            </span>
          </div>
        )}

        <div className="w-6 h-6 text-[10px] flex items-center justify-center rounded-2xl bg-[#E0E8FF] text-main">
          {assignee?.name ? getShortName(assignee.name) : <UnAssignedIcon />}
        </div>
      </div>
    </div>
  );
}
