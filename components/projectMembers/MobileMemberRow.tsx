import React from "react";
import ThreeDotsIcon from "../icons/ThreeDotsIcon";
import { ProjectMember } from "./MembersTable";
import { getShortName } from "@/lib/helper/get-shortname";

type MemberRole = "owner" | "admin" | "member" | "viewer";

const roleStyles = {
  owner: "bg-[#0052CC] text-[#FFFFFF]",
  admin: "bg-[#CDDDFF] text-[#51617E]",
  member: "bg-[#CDDDFF] text-[#51617E]",
  viewer: "bg-[#CDDDFF] text-[#51617E]",
};

const avatarStyles = {
  owner: "bg-[#DAE2FF] text-primary",
  admin: "bg-[#82F9BE] text-[#002113]",
  member: "bg-[#82F9BE] text-[#002113]",
  viewer: "bg-[#D6E3FF] text-[#091C35]",
};

export default function MobileMemberRow({ member }: { member: ProjectMember }) {
  const { email, role, metadata } = member;

  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm w-full">
      <div className="flex items-center gap-4 min-w-0">
        <div
          className={`flex shrink-0 text-sm h-12 w-12 items-center justify-center rounded-xl font-bold ${avatarStyles[role]}`}
        >
          {getShortName(metadata.name)}
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">
            {metadata.name}
          </h3>

          <p className="text-sm text-slate-500 truncate">{email}</p>
        </div>
      </div>

      {/* Right: Role + Menu */}
      <div className="flex flex-col items-end justify-end gap-3">
        <span
          className={`rounded-lg px-3 py-1 text-xs font-semibold uppercase ${roleStyles[role]}`}
        >
          {role}
        </span>

        <button className="text-slate-500 hover:text-slate-800">
          <ThreeDotsIcon />
        </button>
      </div>
    </div>
  );
}
