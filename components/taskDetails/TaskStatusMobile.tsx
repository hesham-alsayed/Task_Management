"use client";

import CheckStatusIcon from "@/components/icons/CheckStatusIcon";
import TaskDetailsIcon from "@/components/icons/TaskDetailsIcon";
import { Epic } from "@/hooks/useGetAllEpics";
import { Field, MemberOptions } from "@/hooks/useTaskForm";
import { statusStylesBadge, statusTasksOptions } from "@/lib/constant";
import { NewTaskFormData } from "@/schema/task.schema";
import { ITaskDetails } from "@/types/task";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import ExclamationIcon from "../icons/ExclamationIcon";
import DropDownIcon from "../icons/DropDownIcon";
import { useClickOutside } from "@/customHooks/useClickOutside";

type Props = {
  updateField: (field: Field, value: string | null) => Promise<void>;
  epics: Epic[];
};

export default function TaskStatusMobile({ updateField, epics }: Props) {
  const {
    watch,
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<NewTaskFormData>();
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenEpic, setIsOpenEpic] = useState(false);

  const title = watch("title");
  const selectedEpicId = watch("epic_id");
  const statusValue = watch("status");
  const hasError = !!errors.title;

  const [isFocused, setIsFocused] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState(false);
  const [loadingEpic, setLoadingEpic] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const epicRef = useRef<HTMLDivElement>(null);

  const selectedStatus = statusTasksOptions.find((status) => status.value === statusValue);
  const epicOptions = epics.map((epic) => ({
    value: epic.id,
    label: epic.epic_id,
  }));

  const selectedEpic = epicOptions.find((epic) => epic.value === selectedEpicId);

  useClickOutside({
    ref: statusRef,
    isOpen: isOpenStatus,
    setIsOpen: setIsOpenStatus,
  });
  useClickOutside({
    ref: epicRef,
    isOpen: isOpenEpic,
    setIsOpen: setIsOpenEpic,
  });
  const handleChangeTitle = async () => {
    setIsFocused(false);

    const isValid = await trigger("title");
    if (!isValid) return;

    try {
      setLoadingTitle(true);
      await updateField("title", title ?? "");
    } finally {
      setLoadingTitle(false);
    }
  };

  const handleChangeStatus = async (status: string) => {
    if (loadingStatus || status === statusValue) {
      setIsOpenStatus(false);
      return;
    }

    try {
      setValue("status", status);
      setIsOpenStatus(false);
      setLoadingStatus(true);

      await updateField("status", status);
    } finally {
      setLoadingStatus(false);
    }
  };

  const handleChangeEpic = async (epicId: string) => {
    try {
      setValue("epic_id", epicId);
      setIsOpenEpic(false);
      setLoadingEpic(true);
      await updateField("epic_id", epicId);
    } finally {
      setLoadingEpic(false);
    }
  };
  return (
    <div className="mt-1 px-8">
      <div className="relative">
        <input
          {...register("title")}
          onFocus={() => setIsFocused(true)}
          onBlur={handleChangeTitle}
          disabled={loadingTitle}
          className={`
                  w-full pr-6 text-[24px] font-bold outline-none border-b transition-all duration-200
                  ${loadingTitle ? "opacity-50 cursor-not-allowed" : "cursor-text"}
                  ${hasError ? "border-red-500" : isFocused ? "border-gray-300" : "border-transparent"}
                `}
        />

        {hasError && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2">
            <ExclamationIcon />
          </span>
        )}
      </div>
      <div ref={statusRef} className="flex items-center gap-2 mt-3 relative">
        <button
          onClick={() => {
            setIsOpenStatus(!isOpenStatus);
            setIsOpenEpic(false);
          }}
          style={{
            backgroundColor: selectedStatus?.bg,
            color: selectedStatus?.color,
          }}
          className={`bg-[#82F9BE] hover:cursor-pointer px-4 text-[11px] font-bold text-[#002113] flex items-center justify-center uppercase gap-2 py-1  rounded-full ${loadingStatus ? "opacity-50 cursor-not-allowed" : "cursor-text"}`}
        >
          <CheckStatusIcon color={selectedStatus?.color || ""} /> {selectedStatus?.label}
          <DropDownIcon color={selectedStatus?.color || ""} />
        </button>
        <div
          className={`absolute top-8 z-50 w-53 max-h-[350px] overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg transition-all duration-200 origin-top ${
            isOpenStatus
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-95 opacity-0"
          }`}
        >
          <ul className="divide-y divide-gray-100">
            {statusTasksOptions.map((status) => (
              <li key={status.value}>
                <button
                  onClick={() => handleChangeStatus(status.value)}
                  type="button"
                  className="w-full px-4 py-2 text-left text-sm font-medium text-[#434654] transition-colors duration-150 hover:cursor-pointer hover:bg-[#F5F7FA] hover:text-primary"
                >
                  {status.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div ref={epicRef} className="relative">
          <button
            onClick={() => {
              setIsOpenEpic(!isOpenEpic);
              setIsOpenStatus(false);
            }}
            className={`bg-[#CDDDFF] flex gap-3 hover:cursor-pointer px-4 text-[11px] font-bold text-[#374763] flex items-center justify-center uppercase  py-1 rounded-full ${loadingEpic ? "opacity-50 cursor-not-allowed" : "cursor-text"} `}
          >
            <TaskDetailsIcon /> {selectedEpic?.label} <DropDownIcon color="#374763" />
          </button>

          <div
            className={`absolute top-8 z-50 w-30 max-h-[350px] overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg transition-all duration-200 origin-top ${
              isOpenEpic
                ? "visible translate-y-0 scale-100 opacity-100"
                : "invisible -translate-y-2 scale-95 opacity-0"
            }`}
          >
            <ul className="divide-y divide-gray-100">
              {epicOptions.map((epic) => (
                <li key={epic.value}>
                  <button
                    onClick={() => handleChangeEpic(epic.value)}
                    type="button"
                    className=" hover:cursor-pointer
              w-full
              px-4
              py-2
              text-left
              text-sm
              font-medium
              text-[#434654]
              transition-colors
              duration-150
              hover:bg-[#F5F7FA]
              hover:text-primary 

            "
                  >
                    {epic.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
