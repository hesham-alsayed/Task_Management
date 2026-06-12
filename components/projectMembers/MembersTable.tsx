import MemberRow from "./MemberRow";

export type MemberRole = "owner" | "admin" | "member" | "viewer";

export type ProjectMember = {
  project_id: string;
  user_id: string;
  email: string;
  member_id: string;
  role: MemberRole;
  metadata: {
    name: string;
    jobTitle?: string;
  };
};

type MembersTableProps = {
  data: ProjectMember[];
};

export default function MembersTable({ data }: MembersTableProps) {
  return (
    <div className="relative  w-full mx-auto rounded-2xl border-t-6 border-b-6 border-l-6  border-[#F1F3FF] ">
      {/* Header */}

      <div className="grid grid-cols-[1fr_180px_80px] px-8 py-5 text-[11px] font-bold  uppercase tracking-wider text-[#434654]">
        <span>Member</span>
        <span>Role</span>
        <span className="text-right">Actions</span>
      </div>

      {/* Rows */}
      {data.map((member) => (
        <MemberRow member={member} key={member.project_id} />
      ))}
    </div>
  );
}
