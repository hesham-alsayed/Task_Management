import { formatDate } from "@/lib/helper/formate-date";
import React from "react";
import DateIcon from "../icons/DateIcon";
import PencilIcon from "../icons/PencilIcon";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  created_by: string;
};

type Props = {
  project: Project;
};

export default function CardProject({ project }: Props) {
  const { name, description, created_at, id } = project;
  const router = useRouter();

  return (
    <div className="relative w-full h-[220px] p-4 bg-white flex flex-col rounded-md">
      {/* FULL CARD CLICK (EPICS) - AS OVERLAY LINK */}
      <div
        onClick={() => router.push(`/project/${id}/epics`)}
        className="absolute inset-0 cursor-pointer"
      />

      {/* CONTENT */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between gap-1">
          <h1 className="font-medium text-[18px] text-main">{name}</h1>

          {/* EDIT BUTTON */}
          <button
            onClick={() => router.push(`/project/${id}/edit`)}
            className="relative z-20 cursor-pointer"
          >
            <PencilIcon />
          </button>
        </div>

        <p className="text-sm font-normal text-[#434654] min-h-[40px]">
          {description || ""}
        </p>
      </div>

      <div className="mt-auto relative z-10 flex items-center border-t border-t-gray-100 justify-between">
        <p className="font-bold hidden lg:bolck text-[11px] text-[#737685] uppercase">
          CREATED AT
        </p>

        <p className="text-[#434654] flex items-center gap-2 font-medium text-sm mt-3">
          <span className="lg:hidden">
            <DateIcon />
          </span>
          {formatDate(created_at)}
        </p>
      </div>
    </div>
  );
}
