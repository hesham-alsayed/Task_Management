import React from "react";
import HeaderPage from "../shared/HeaderPage";
import CurrentLocation from "../shared/CurrentLocation";

type Props = {
  projectId: string;
  projectName: string;
};
export default function HeaderNewEpics({ projectId, projectName }: Props) {
  const items = [
    { label: "projects", href: "/project" },
    {
      label: projectName || "",
      href: `/project/${projectId}/edit`,
    },
    {
      label: "Epics",
      href: `/project/${projectId}/epics`,
    },
    {
      label: "New Epics",
    },
  ];
  return (
    <div>
      <div className="hidden sm:block">
        <CurrentLocation items={items} />
      </div>
      <div className="mt-5">
        <h1 className="text-[36px] text-main font-bold">Create New Epic</h1>
        <p className="text-[16px] mt-2 text-[#434654] font-normal max-w-[512px]">
          Define a major project phase or high-level milestone to group related
          tasks and track architectural progress.
        </p>
      </div>
    </div>
  );
}
