"use client";

import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import UnAssignedIcon from "../icons/UnAssignedIcon";
import { getShortName } from "@/lib/helper/get-shortname";
import { ProjectMember } from "../projectMembers/MembersTable";
import { updateEpicAction } from "@/server-actions/epics/updateEpic";
import { useAppSelector } from "@/app/store/hooks";
import toast from "react-hot-toast";

type AssignedState = {
  id: string;
  name: string;
};

type Props = {
  assigned: AssignedState;
  setAssigned: React.Dispatch<React.SetStateAction<AssignedState>>;
  editingAssignee: boolean;
  setEditingAssignee: React.Dispatch<React.SetStateAction<boolean>>;
  members: ProjectMember[];
};

export default function EpicAssignee({
  assigned,
  setAssigned,
  editingAssignee,
  setEditingAssignee,
  members,
}: Props) {
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedEpicId = useAppSelector((state) => state.ui.selectedEpicId);

  const [loading, setLoading] = useState(false);

  const assigneeOptions = [
    { value: null, label: "Unassigned" },
    ...members.map((item) => ({
      value: item.user_id,
      label: item.metadata.name,
    })),
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setEditingAssignee(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = async (select: any) => {
    if (!select) return;

    const prev = assigned;

    const newValue: AssignedState = {
      id: select.value ?? "unassigned",
      name: select.label,
    };

    setAssigned(newValue);

    if (!selectedEpicId) return;

    setLoading(true);

    const res = await updateEpicAction(selectedEpicId, {
      assignee_id: select.value,
    });

    if (!res?.success) {
      setAssigned(prev);
      toast.error("Failed to update epic. Please try again.");
      setLoading(false);
      return;
    }

    setLoading(false);
    setEditingAssignee(false);
    toast.success("Epic updated successfully");
  };

  return (
    <div>
      <span className="uppercase text-[11px] font-bold text-[#4F5F7B]">
        Assignee
      </span>

      {editingAssignee ? (
        <div ref={selectRef}>
          <Select
            options={assigneeOptions}
            value={{
              value: assigned.id === "unassigned" ? null : assigned.id,
              label: assigned.name,
            }}
            onChange={handleSave}
            isDisabled={loading}
          />
        </div>
      ) : (
        <div
          onClick={() => setEditingAssignee(true)}
          className="flex items-center gap-2 mt-2 cursor-pointer"
        >
          {assigned.id === "unassigned" ? (
            <div className="flex items-center gap-3">
              <span className="bg-[#CDDDFF] p-1 rounded-xl">
                <UnAssignedIcon />
              </span>
              <span className="text-sm font-medium text-[#4F5F7B]">
                Unassigned
              </span>
            </div>
          ) : (
            <>
              <div className="w-7 h-7 flex items-center justify-center rounded-xl bg-[#CDDDFF] text-[10px] font-bold">
                {getShortName(assigned.name)}
              </div>
              <span className="text-sm font-medium capitalize text-main">
                {assigned.name}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
