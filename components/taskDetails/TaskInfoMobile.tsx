"use client";

import DateIcon from "@/components/icons/DateIcon";
import TaskCreatedAtIcon from "@/components/icons/TaskCreatedAtIcon";
import { Field, MemberOptions } from "@/hooks/useTaskForm";
import { formatDate } from "@/lib/helper/formate-date";
import { getShortName } from "@/lib/helper/get-shortname";
import { ITaskDetails } from "@/types/task";
import DropDownIcon from "../icons/DropDownIcon";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { NewTaskFormData } from "@/schema/task.schema";
import { useClickOutside } from "@/customHooks/useClickOutside";
import toast from "react-hot-toast";
import TaskDueDate from "./TaskDueDate";

type Props = {
  task: ITaskDetails | null;
  membersOptions: MemberOptions[];
  updateField: (field: Field, value: string | null) => Promise<void>;
};

export default function TaskInfoMobile({ task, membersOptions, updateField }: Props) {
  const [isOpenAssignee, setIsOpenAssignee] = useState(false);
  const [loadingAssignee, setLoadingAssignee] = useState(false);
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<NewTaskFormData>();
  const selectedAssigneeId = watch("assignee_id");
  const selectedMember = membersOptions.find((member) => member.value === selectedAssigneeId);
  const assigneeRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside({
    ref: assigneeRef,
    isOpen: isOpenAssignee,
    setIsOpen: setIsOpenAssignee,
  });

  const handleChangeAssignee = async (memberId: string | null) => {
    try {
      setValue("assignee_id", memberId);

      setIsOpenAssignee(false);

      setLoadingAssignee(true);

      await updateField("assignee_id", memberId);
    } finally {
      setLoadingAssignee(false);
    }
  };
  return (
    <div className="grid grid-cols-2 gap-2 mt-6 px-8">
      <div
        ref={assigneeRef}
        className={`bg-[#F1F3FF] border border-[#e5e7eb] rounded-lg px-3 py-2 relative ${loadingAssignee ? "cursor-not-allowed opacity-60" : "cursor-pointer "}`}
      >
        <span
          style={{
            lineHeight: "16px",
            letterSpacing: "1px",
          }}
          className="text-[#434654] font-bold text-[11px] uppercase"
        >
          Assignee
        </span>

        <div
          onClick={() => setIsOpenAssignee(!isOpenAssignee)}
          className="flex items-center gap-2 mt-1.5 hover:cursor-pointer"
        >
          <div className="w-6 h-6 flex items-center justify-center rounded-xl bg-[#DAE2FF] text-primary text-[9px] font-bold">
            {selectedMember?.label ? getShortName(selectedMember.label) : "Un"}
          </div>

          <p className="text-[13px] font-medium capitalize text-main truncate">
            {selectedMember?.label || "Unassigned"}
          </p>
          <span className="ml-auto">
            <DropDownIcon />
          </span>
        </div>

        <div
          className={`absolute top-19 left-0 z-50 w-full max-h-[350px] overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg transition-all duration-200 origin-top ${
            isOpenAssignee
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-95 opacity-0"
          }`}
        >
          <ul className="divide-y divide-gray-100 ">
            {membersOptions.map((member, index) => (
              <li
                className="hover:bg-gray-100 py-1 px-2"
                key={member.value!! + index}
                onClick={() => handleChangeAssignee(member.value)}
              >
                <div className="flex  items-center gap-2 mt-1.5  hover:cursor-pointer">
                  <div className="w-6 h-6 flex items-center justify-center rounded-xl bg-[#DAE2FF] text-primary text-[9px] font-bold">
                    {member.label ? getShortName(member.label) : "Un"}
                  </div>

                  <p className="text-[13px] font-medium capitalize text-main truncate">
                    {member.label || "Unassigned"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-[#F1F3FF] border border-[#e5e7eb] rounded-lg px-3 py-2">
        <span
          style={{
            lineHeight: "16px",
            letterSpacing: "1px",
          }}
          className="text-[#434654] font-bold text-[11px] uppercase"
        >
          Due Date
        </span>

        <TaskDueDate updateField={updateField} mobile={true} />
      </div>

      <div className="bg-[#F1F3FF] border border-[#e5e7eb] rounded-lg px-3 py-2">
        <span
          style={{
            lineHeight: "16px",
            letterSpacing: "1px",
          }}
          className="text-[#434654] font-bold text-[11px] uppercase"
        >
          Created By
        </span>

        <div className="flex items-center gap-2 mt-1.5">
          <div className="w-6 h-6 flex items-center justify-center rounded-xl bg-[#DAE2FF] text-primary text-[9px] font-bold">
            {getShortName(task?.created_by?.name || "")}
          </div>

          <p className="text-[13px] font-medium capitalize text-main truncate">
            {task?.created_by?.name}
          </p>
        </div>
      </div>

      <div className="bg-[#F1F3FF] border border-[#e5e7eb] rounded-lg px-3 py-2">
        <span
          style={{
            lineHeight: "16px",
            letterSpacing: "1px",
          }}
          className="text-[#434654] font-bold text-[11px] uppercase"
        >
          Created At
        </span>

        <div className="flex items-center gap-2 mt-1.5">
          <TaskCreatedAtIcon />

          <p className="text-[13px] font-medium capitalize text-main truncate">
            {formatDate(task?.created_at || "")}
          </p>
        </div>
      </div>
    </div>
  );
}
