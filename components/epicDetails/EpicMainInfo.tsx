"use client";

import { useState } from "react";
import { EpicDetails } from "./EpicModalDetails";

import EpicDescription from "./EpicDescription";
import EpicCreatedBy from "./EpicCreatedBy";
import EpicAssignee from "./EpicAssignee";
import EpicDeadline from "./EpicDeadline";
import EpicCreatedAt from "./EpicCreatedAt";
import { useMembersProject } from "@/hooks/useMembersProject";
import { Epic } from "@/hooks/useGetAllEpics";
import { ProjectMember } from "../projectMembers/MembersTable";

type Props = {
  epic: Epic; 
  members : ProjectMember[]
};
export default function EpicMainInfo({ epic , members }: Props) {
  const { created_by, assignee,  created_at } = epic;

  return (
    <div className="pt-3 p-6">
      <EpicDescription />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        <EpicCreatedBy created_by={created_by} />

        <EpicAssignee members={members}  />

        <EpicDeadline />

        <EpicCreatedAt created_at={created_at} />
      </div>
    </div>
  );
}
