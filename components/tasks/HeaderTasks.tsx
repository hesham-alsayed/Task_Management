"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import PyramidsIcon from "../icons/PyramidsIcon";
import SearchIcon from "../icons/SearchIcon";
import CurrentLocation from "../shared/CurrentLocation";
import SelectView from "./SelectView";
import PlusIcon from "../icons/PlusIcon";
import Link from "next/link";
import useDebounceSearch from "@/customHooks/useDebounceSearch";

type Props = {
  projectId: string;
  projectName: string;
};

export default function HeaderTasks({ projectId, projectName }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(searchParams.get("title") || "");
  const debounceValue = useDebounceSearch(value, 1000);
  useEffect(() => {
    const currentTitle = searchParams.get("title") || "";

    if (currentTitle === debounceValue.toLowerCase()) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (debounceValue.trim()) {
      params.set("title", debounceValue.toLowerCase());
    } else {
      params.delete("title");
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  }, [debounceValue]);

  const handleToggleView = () => {
    const params = new URLSearchParams(searchParams.toString());

    const currentView = params.get("view") || "list";

    const nextView = currentView === "board" ? "list" : "board";

    params.set("view", nextView);

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const controlviewTasks = () => {
      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop) return;

      const currentView = searchParams.get("view");

      if (currentView !== "list") {
        const params = new URLSearchParams(searchParams.toString());
        params.set("view", "list");

        router.replace(`${pathname}?${params.toString()}`);
      }
    };

    controlviewTasks();

    window.addEventListener("resize", controlviewTasks);

    return () => {
      window.removeEventListener("resize", controlviewTasks);
    };
  }, [pathname, router, searchParams]);

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
    <div className="spcace-y-4 max-sm:mt-10">
      <div className="hidden lg:block">
        <CurrentLocation items={items} />
      </div>

      <div className="flex  flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className=" text-[30px] max-md:text-center max-sm:text-start mt-6 font-semibold text-main">
            Active Workboard
          </h1>

          <span className="text-sm hidden md:block font-normal text-[#64748B]">
            Curating Project Alpha's production pipeline and milestones.
          </span>
        </div>

        <div className="flex items-end gap-4 justify-end xl:mt-8">
          <div className="relative max-md:w-[180px] max-md:w-full  max-md:mt-0  max-lg:-mt-40  w-[256px] max-sm:w-full">
            <div className="absolute left-3 top-2 text-gray-400">
              <SearchIcon />
            </div>

            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search Task"
              className="input-form w-full pl-9 h-10"
            />
          </div>

          <div className="hidden lg:flex gap-2">
            <SelectView />

            <button
              onClick={handleToggleView}
              className="w-10 h-10 hover:cursor-pointer  rounded-sm flex items-center justify-center  bg-[#D7E2FF]"
            >
              <PyramidsIcon />
            </button>
          </div>
        </div>

        <Link href={`/project/${projectId}/tasks/new`} className="sm:hidden w-full">
          <button className="capitalize w-full mt-3 btn-primary py-3 px-6 flex items-center gap-2 justify-center">
            <PlusIcon />
            create task
          </button>
        </Link>
      </div>
    </div>
  );
}
