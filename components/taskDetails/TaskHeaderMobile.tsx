"use client";

import OverlayIcon from "@/components/icons/OverlayIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import { ITaskDetails } from "@/types/task";
import { Field } from "@/hooks/useTaskForm";

type Props = {
  task: ITaskDetails | null;
  onClose: () => void;
};

export default function TaskHeaderMobile({ task, onClose }: Props) {
  return (
    <div className="py-4 px-8">
      <span className="flex items-center justify-center">
        <OverlayIcon />
      </span>

      <div className="mt-1 flex items-center justify-between">
        <span className="text-[11px] text-[#4F5F7B] font-bold">{task?.task_id}</span>
        
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
