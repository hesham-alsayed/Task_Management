import TaskDetailsIcon from "@/components/icons/TaskDetailsIcon";
import { ITaskDetails } from "@/types/task";

interface Props {
  task: ITaskDetails | null;
}

export default function TaskDetailsHeader({ task }: Props) {
  return (
    <div className="space-y-3 px-8 py-6 pb-10">
      <div className="flex items-center gap-6">
        <div className="bg-[#DAE2FF] w-20 text-[#003D9B] text-[12px] font-bold flex items-center justify-center h-5 rounded-sm text-center py-0.5 px-2">
          {task?.task_id}
        </div>

        <span className="flex items-center gap-2 text-sm text-[#434654] font-medium">
          <TaskDetailsIcon />
          {`${task?.epic?.epic_id} (${task?.epic.title})`}
        </span>
      </div>

      <h1
        style={{ lineHeight: "36px" }}
        className="text-main font-bold text-[30px] w-full"
      >
        {task?.title}
      </h1>
    </div>
  );
}