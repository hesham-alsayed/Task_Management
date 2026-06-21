"use client";

import React from "react";
import Select from "react-select";
import { ProjectMember } from "../projectMembers/MembersTable";
import UnAssignedIcon from "../icons/UnAssignedIcon";
import { getShortName } from "@/lib/helper/get-shortname";

type Option = {
  value: string | null;
  label: string;
  isUnassigned?: boolean;
};

type Props = {
  members: ProjectMember[];
  value: string | null;
  loading: boolean;
  onChange: (value: string | null) => void;
  onClose: () => void;
};

export default function EpicAssigneeDropDown({
  members,
  value,
  loading,
  onChange,
  onClose,
}: Props) {
  const options: Option[] = [
    { value: null, label: "Unassigned", isUnassigned: true },
    ...members.map((m) => ({
      value: m.user_id,
      label: m.metadata.name,
    })),
  ];

  const selected =
    options.find((o) => o.value === value) ?? null;

  return (
    <div className="absolute top-full left-0 z-50 mt-2 w-full">
      <Select
        autoFocus
        menuIsOpen
        options={options}
        value={selected}
        isDisabled={loading}
        onChange={(option: any) => {
          const newValue = option?.value ?? null;
          onChange(newValue);
          onClose();
        }}
        onBlur={onClose}
        formatOptionLabel={(option: any) => {
          if (option.isUnassigned) {
            return (
              <div className="flex items-center gap-2">
                <span className="bg-[#CDDDFF] p-1 rounded-xl">
                  <UnAssignedIcon />
                </span>
                <span className="text-sm font-medium">
                  Unassigned
                </span>
              </div>
            );
          }

          return (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center rounded-xl bg-[#DAE2FF] text-[10px] font-bold">
                {getShortName(option.label)}
              </div>

              <span className="text-sm font-medium truncate">
                {option.label}
              </span>
            </div>
          );
        }}
      />
    </div>
  );
}