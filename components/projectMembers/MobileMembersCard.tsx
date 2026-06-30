import React from "react";
import { ProjectMember } from "./MembersTable";
import MobileMemberRow from "./MobileMemberRow";

type Props = {
  data: ProjectMember[];
};
export default function MobileMembersCard({ data }: Props) {
  return (
    <div className="flex flex-col gap-4  ">
      {data.map((member, index) => (
        <MobileMemberRow member={member} key={member.project_id + index} />
      ))}
    </div>
  );
}
