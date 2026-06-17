"use client";

import  {  useState } from "react";
import { EpicDetails } from "./EpicModalDetails";

import EpicDescription from "./EpicDescription";
import EpicCreatedBy from "./EpicCreatedBy";
import EpicAssignee from "./EpicAssignee";
import EpicDeadline from "./EpicDeadline";
import EpicCreatedAt from "./EpicCreatedAt";
import { useMembersProject } from "@/hooks/useMembersProject";
import { Epic } from "@/hooks/useGetAllEpics";

type Props = {
  epic: EpicDetails; 
    setEpics: React.Dispatch<React.SetStateAction<Epic[]>>;
  
};

export default function EpicMainInfo({ epic , setEpics }: Props) {
  const { description, created_by, assignee, deadline, created_at } = epic;
  const { data } = useMembersProject();
  const [descriptionValue, setDescriptionValue] = useState(
    description || "No description provided",
  );

  const [assigned, setAssigned] = useState({
    id: assignee?.sub || "unassigned",
    name: assignee?.name || "Unassigned",
  });

  const [deadlineValue, setDedlineValue] = useState(deadline || "");
  const [editingAssignee, setEditingAssignee] = useState(false);
  const [editingDeadline, setEditingDeadline] = useState(false);
 


  return (
    <div className="pt-3 p-6">
      <EpicDescription initialValue={descriptionValue} />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        <EpicCreatedBy created_by={created_by} />

        <EpicAssignee
          assigned={assigned}
          setAssigned={setAssigned}
          editingAssignee={editingAssignee}
          setEditingAssignee={setEditingAssignee}
          members={data}
          setEpics={setEpics}
        />

        <EpicDeadline
          deadlineValue={deadlineValue}
          setDedlineValue={setDedlineValue}
          editingDeadline={editingDeadline}
          setEditingDeadline={setEditingDeadline}
        />

        <EpicCreatedAt created_at={created_at} />
      </div>
    </div>
  );
}
