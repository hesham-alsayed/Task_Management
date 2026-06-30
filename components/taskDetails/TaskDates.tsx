"use client";
import { formatDate } from "@/lib/helper/formate-date";
import { ITaskDetails } from "@/types/task";
import { Field } from "@/hooks/useTaskForm";
import TaskDueDate from "./TaskDueDate";

type Props = {
  task: ITaskDetails | null;
  updateField: (field: Field, value: string | null) => Promise<void>;
};
export default function TaskDates({ task, updateField }: Props) {
  return (
    <div className="border-t-[#C3C6D633] pt-6 border-t mt-6 space-y-6">
      <TaskDueDate updateField={updateField} />
      <div className="flex items-center justify-between gap-1">
        <span className="text-[12px] text-[#434654] font-normal capitalize">created at</span>
        <span className="text-sm text-main font-medium ">{formatDate(task?.created_at || "")}</span>
      </div>
    </div>
  );
}
