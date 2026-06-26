import { UseFormRegister } from "react-hook-form";
import DropDownIcon from "../icons/DropDownIcon";
import { ProjectMember } from "../projectMembers/MembersTable";
import { EpicForm } from "@/hooks/useEpicForm";

type Props = {
  register: UseFormRegister<EpicForm>;
  members: ProjectMember[];
};

export default function AssigneeField({ register, members }: Props) {
  console.log(members);
  return (
    <div className="space-y-4 w-full">
      <label htmlFor="assignee" className="label-form">
        Assignee
      </label>

      <div className="relative">
        <select
          id="assignee"
          className="input-form w-full appearance-none pr-10"
          defaultValue=""
          {...register("assignee_id")}
        >
          <option value="" disabled>
            Select a member
          </option>

          {members.map((member) => (
            <option key={member.user_id} value={member.user_id}>
              {member?.metadata.name}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
          <DropDownIcon />
        </div>
      </div>
    </div>
  );
}
