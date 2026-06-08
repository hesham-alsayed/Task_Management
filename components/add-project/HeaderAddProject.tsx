import CurrentLocation from "./CurrentLocation";
import InviteMemberIcon from "../icons/InviteMemberIcon";

export default function HeaderAddProject() {
  return (
    <div className="sm:flex gap-2 justify-between hidden">
      <div className="space-y-4">
        <CurrentLocation />

        <h1
          style={{ letterSpacing: "-0.9px" }}
          className="text-[36px] text-[#041B3C] font-semibold"
        >
          Add New Project
        </h1>
      </div>

      <div className="flex items-end mb-2">
        <button className="btn-primary h-10 rounded-sm text-sm text-[#fffff] font-bold flex items-center justify-center gap-2 py-2 px-4 w-45">
          <InviteMemberIcon />
          Invite Member
        </button>
      </div>
    </div>
  );
}