"use client";

import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { ProjectMember } from "../projectMembers/MembersTable";
import EpicAssigneeDisplay from "./EpicAssigneeDisplay";

import { EpicForm, useEpicForm } from "@/hooks/useEpicForm";
import EpicAssigneeDropDown from "./EpicAssigneeDropDown";

type Props = {
  members: ProjectMember[];
};

export default function EpicAssignee({ members }: Props) {
  const { loading, updateField } = useEpicForm();
  const { control } = useFormContext<EpicForm>();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full -mt-1">
      <span className="uppercase text-[11px] font-bold text-[#4F5F7B]">Assignee</span>

      <Controller
        name="assignee_id"
        control={control}
        render={({ field }) => {
          return (
            <div className={`relative mt-2 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
              <EpicAssigneeDisplay
                value={field.value || null}
                label={members.find((m) => m.user_id === field.value)?.metadata.name}
                onOpen={() => setMenuOpen(true)}
              />

              {menuOpen && (
                <EpicAssigneeDropDown
                  members={members}
                  value={field.value ?? null}
                  loading={loading}
                  onClose={() => setMenuOpen(false)}
                  onChange={async (value) => {
                    field.onChange(value);
                    await updateField("assignee_id", value);
                  }}
                />
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
