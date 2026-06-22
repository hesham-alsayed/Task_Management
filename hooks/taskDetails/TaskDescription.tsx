import { ITaskDetails } from "@/types/task";

interface Props {
  task: ITaskDetails | null;
}

export default function TaskDescription({ task }: Props) {
  return (
    <div className="pt-6 border-t border-gray-100">
      <span className="text-[#434654] px-8 text-[11px] font-bold uppercase">
        description
      </span>

      <p
        style={{ lineHeight: "22px" }}
        className="text-sm px-8 text-[#041B3C] font-normal mt-2 capitlaize"
      >
        {task?.description || "No Description Found"}
      </p>
    </div>
  );
}