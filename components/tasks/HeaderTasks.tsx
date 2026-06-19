"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PyramidsIcon from "../icons/PyramidsIcon";
import SearchIcon from "../icons/SearchIcon";
import CurrentLocation from "../shared/CurrentLocation";
import SelectView from "./SelectView";

type Props = {
  projectId: string;
  projectName: string;
};
export default function HeaderTasks({ projectId, projectName }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleToggleView = () => {
    const params = new URLSearchParams(searchParams.toString());

    const currentView = params.get("view");

    params.set("view", currentView === "board" ? "list" : "board");

    router.push(`${pathname}?${params.toString()}`);
  };
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
    },
  ];
  return (
    <div className="spcace-y-4">
      <CurrentLocation items={items} />
      <div className="flex justify-between">
        <div>
          <h1 className="text-[30px] mt-6 font-semibold text-main">
            Active Workboard
          </h1>
          <span className="text-sm font-normal text-[#64748B]">
            Curating Project Alpha's production pipeline and milestones.
          </span>
        </div>
        <div className="flex items-end gap-4 justify-end">
          <div className="relative  w-[256px]  ">
            <div className="absolute left-3 top-2 text-gray-400">
              <SearchIcon />
            </div>

            <input
              type="text"
              placeholder="Search Task"
              className="input-form w-full pl-9 h-10"
            />
          </div>

          <div>
            <SelectView />
          </div>
          <button
            onClick={handleToggleView}
            className="w-10 h-10 hover:cursor-pointer p-2 px-4 rounded-sm flex items-center justify-center bg-[#D7E2FF]"
          >
            <span>
              <PyramidsIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
