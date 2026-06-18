"use client";

import { MemberOptions } from "@/hooks/useAddNewTask";
import { NewTaskFormData } from "@/schema/task.schema";
import { Control, Controller } from "react-hook-form";
import Select from "react-select";

type Props = {
  control: Control<NewTaskFormData>;
  membersOptions: MemberOptions[];
  selectStyles: any;
};

export default function AssigneeSelect({
  control,
  membersOptions,
  selectStyles,
}: Props) {
  return (
    <div>
      <label className="label-form">Assignee</label>

      <Controller
        control={control}
        name="assignee_id"
        render={({ field }) => (
          <Select
            options={membersOptions}
            instanceId="task-assignee"
            placeholder="Select Team Member"
            styles={selectStyles}
            value={membersOptions.find((i) => i.value === field.value) || null}
            onChange={(option) => field.onChange(option?.value)}
          />
        )}
      />
    </div>
  );
}
