import { getShortName } from "@/lib/helper/get-shortname";
import ThreeDotsIcon from "../icons/ThreeDotsIcon";
import { ProjectMember } from "./MembersTable";

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
export default function MemberRow({member}: {member :ProjectMember}) {
  const { email, role, metadata } = member;
  return (
    <div className="grid grid-cols-[1fr_180px_80px] bg-[#FFFFFF] items-center  px-8 py-6">
      <div className="flex items-center gap-4">
        <div
          className={`flex text-sm h-12 w-12 items-center justify-center rounded-xl  font-bold ${avatarStyles[role]}`}
        >
          {getShortName(metadata.name)}
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">{metadata.name}</h3>
          <p className="text-sm text-slate-500">{email}</p>
        </div>
      </div>

      <div>
        <span
          className={`inline-flex rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide ${roleStyles[role]}`}
        >
          {role}
        </span>
      </div>

      <div className="flex justify-end">
        {role !== "owner" && (
          <button className="text-slate-500 transition hover:text-slate-800">
            <ThreeDotsIcon />
          </button>
        )}
      </div>
    </div>
  );
}
