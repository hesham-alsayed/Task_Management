"use client";
import React from "react";
import CurrentLocation from "../shared/CurrentLocation";

type Props = {
  projectId: string;
  projectName: string;
};
export default function HeaderNewTask({ projectId, projectName }: Props) {
  const items = [
    {
      label: "projects",
      href: "/project",
    },
    {
      label: projectName,
      href: `/project/${projectId}/edit`,
    },
    {
      label: "Tasks",
      href: `/project/${projectId}/tasks`,
    },
    {
      label: "New Task",
    },
  ];
  return (
    <div className="space-y-4 max-sm:mt-14 max-sm:mx-6">
      <div className=" hidden sm:block">
        <CurrentLocation items={items} />
      </div>
      <div className="space-y-2">
        <h1 className="text-[32px] text-main font-semibold">Create New Task</h1>
        <p className="text-[#434654] text-sm font-normal">
          Initialize a new work item within the Architectural Workspace
          ecosystem.
        </p>
      </div>
    </div>
  );
}
