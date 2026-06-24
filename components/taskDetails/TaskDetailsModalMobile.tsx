"use client";

import { ITaskDetails } from "@/types/task";
import TaskHeaderMobile from "./TaskHeaderMobile";
import TaskStatusMobile from "./TaskStatusMobile";
import TaskInfoMobile from "./TaskInfoMobile";
import TaskDescriptionMobile from "./TaskDescriptionMobile";
import TaskDetailsSkeletonMobile from "@/components/skeleton/TaskDetailsSkeletonMobile";
import TaskErrorState from "./TaskErrorState";

type Props = {
  onClose: () => void;
  task: ITaskDetails | null;
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;
};

export default function TaskDetailsModalMobile({ onClose, task, isLoading, error, isOpen }: Props) {
  const isError = !isLoading && error !== null;

  return (
    <div className="fixed inset-0 z-[6000]">
      <div
        onClick={onClose}
        className={`
          absolute inset-0 bg-[#041B3C33] backdrop-blur-[2px]
          ${
            isOpen
              ? "animate-[fadeIn_0.3s_ease-out_forwards]"
              : "animate-[fadeOut_0.35s_ease-in_forwards]"
          }
        `}
      />

      <div
        className={`
          absolute bottom-0 left-0 right-0
          ${
            isOpen
              ? "animate-[slideUp_0.3s_ease-out_forwards]"
              : "animate-[slideDown_0.3s_ease-in_forwards]"
          }
        `}
      >
        <div className="border-t border-gray-100 w-full h-[95vh] bg-[#f7f7f7] rounded-t-2xl shadow-xl overflow-y-auto">
          {isLoading ? (
            <TaskDetailsSkeletonMobile />
          ) : isError ? (
            <>
              <TaskHeaderMobile onClose={onClose} task={task} />
              <TaskErrorState message={error} />
            </>
          ) : (
            <div>
              <TaskHeaderMobile onClose={onClose} task={task} />
              <TaskStatusMobile task={task} />
              <TaskInfoMobile task={task} />
              <TaskDescriptionMobile task={task} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
