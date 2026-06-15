"use client";
import React from "react";
import CurrentLocation from "../shared/CurrentLocation";
import SearchIcon from "../icons/SearchIcon";
import PlusIcon from "../icons/PlusIcon";
import { useParams, useRouter } from "next/navigation";

type Props = {
  projectId: string;
  projectName: string;
};

export default function HeaderEpicList({ projectId, projectName }: Props) {
  const router = useRouter();
  const params = useParams();
  const currentProjectId = (params.projectId as string) || projectId;
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
      label: "Epics",
    },
  ];

  return (
    <div className="flex md:items-center flex-col md:flex-row justify-between ">
      <div className="hidden sm:block w-full md:w-[50%]">
        <CurrentLocation items={items} />
        <h1 className="text-[30px] font-bold text-main mt-4">Project Epics</h1>
      </div>

      <div className="flex items-center  mx-auto max-sm:mx-auto justify-center gap-4 w-full md:w-[50%]">
        <div className="relative w-full ">
          <div className="absolute left-3 top-6 text-gray-400">
            <SearchIcon />
          </div>

          <input
            type="text"
            placeholder="Search epics..."
            className="input-form w-full pl-9"
          />
        </div>

        <div className="hidden sm:block">
          <button
            onClick={() => router.push(`/project/${currentProjectId}/epics/new`)}
            className="flex items-center mt-1 h-[47px] justify-center gap-2 btn-primary w-30"
          >
            <PlusIcon />
            New Epic
          </button>
        </div>
      </div>
    </div>
  );
}
