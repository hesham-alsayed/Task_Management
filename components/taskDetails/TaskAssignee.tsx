"use client";
import { Field, MemberOptions } from "@/hooks/useTaskForm";
import { getShortName } from "@/lib/helper/get-shortname";
import { NewTaskFormData } from "@/schema/task.schema";
import { ITaskDetails } from "@/types/task";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import DropDownIcon from "../icons/DropDownIcon";

type Props = {
  task: ITaskDetails | null;
  membersOptions: MemberOptions[];
  updateField: (field: Field, value: string | null) => Promise<void>;
};
export default function TaskAssignee({ task, membersOptions, updateField }: Props) {
  const { watch, setValue } = useFormContext<NewTaskFormData>();

  const selectedAssigneeId = watch("assignee_id");

  const selectedMember = membersOptions.find((member) => member.value === selectedAssigneeId);

  const [isOpen, setIsOpen] = useState(false);
  const [loadingAssignee, setLoadingAssignee] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChangeAssignee = async (memberId: string | null) => {
    try {
      setValue("assignee_id", memberId);

      setIsOpen(false);

      setLoadingAssignee(true);

      await updateField("assignee_id", memberId);
    } finally {
      setLoadingAssignee(false);
    }
  };
  return (
    <div className="mt-8">
      <span
        style={{
          lineHeight: "16px",
          letterSpacing: "1px",
        }}
        className="text-[#434654] mb-6 font-bold text-[11px] uppercase"
      >
        Assignee
      </span>

      <div ref={dropdownRef} className="relative mt-3 w-full">
        <div className="bg-white rounded-xl p-2">
          <button
            type="button"
            disabled={loadingAssignee}
            onClick={() => setIsOpen((prev) => !prev)}
            className={`w-full rounded-xl transition ${
              loadingAssignee ? "bg-gray-100 cursor-not-allowed opacity-60" : "cursor-pointer "
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-7 h-7 flex items-center justify-center rounded-xl bg-[#DAE2FF] text-[10px] font-bold">
                  {selectedMember?.value ? getShortName(selectedMember.label) : "Un"}
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold capitalize text-main">
                    {selectedMember?.label ?? "Unassigned"}
                  </p>

                  <p className="text-[10px] font-normal text-[#434654]">
                    {selectedMember?.value ? "Project Member" : "No assignee selected"}
                  </p>
                </div>
              </div>

              <DropDownIcon />
            </div>
          </button>
        </div>

        <div
          className={`absolute left-0 top-full mt-2 z-50 w-full max-h-72 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-200 origin-top ${
            isOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-95 opacity-0"
          }`}
        >
          <ul className="divide-y divide-gray-100">
            {membersOptions.map((member, index) => (
              <li key={`${member.value}-${index}`}>
                <button
                  type="button"
                  onClick={() => handleChangeAssignee(member.value)}
                  className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 transition-colors duration-150 hover:bg-[#F5F7FA]"
                >
                  <div className="w-8 h-8 rounded-full bg-[#DAE2FF] flex items-center justify-center text-xs font-bold">
                    {member.value ? getShortName(member.label) : "Un"}
                  </div>

                  <span className="text-sm font-medium text-[#434654]">{member.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
