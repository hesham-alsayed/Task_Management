"use client";

import TaskDetailsModalSkeleton from "@/components/skeleton/TaskDetailsModalSkeleton";
import { ITaskDetails } from "@/types/task";
import TaskDetailsHeader from "./TaskDetailsHeader";
import TaskDescription from "./TaskDescription";
import TaskFooter from "./TaskFooter";
import TaskStatusSelect from "./TaskStatusSelect";
import TaskAssignee from "./TaskAssignee";
import TaskReporter from "./TaskReporter";
import TaskDates from "./TaskDates";
import TaskErrorState from "./TaskErrorState";

type Props = {
  onClose: () => void;
  task: ITaskDetails | null;
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;
};

export default function TaskDetailsModal({ onClose, task, isLoading, error, isOpen }: Props) {
  const isError = !isLoading && error !== null;

  return (
    <div className="fixed inset-0 z-[6000] flex items-center justify-center">
      <div
        onClick={onClose}
        className={`
          absolute inset-0 bg-[#041B3C33] backdrop-blur-[2px]
          ${
            isOpen
              ? "animate-[fadeIn_0.3s_ease-out_forwards]"
              : "animate-[fadeOut_0.3s_ease-in_forwards]"
          }
        `}
      />

      <div
        className={`
          relative z-20 mx-4 w-full max-w-4xl h-[97vh]
          bg-white rounded-lg shadow-xl overflow-hidden

          ${
            isOpen
              ? "animate-[modalIn_0.3s_ease-out_forwards]"
              : "animate-[modalOut_0.3s_ease-in_forwards]"
          }
        `}
      >
        {isLoading ? (
          <TaskDetailsModalSkeleton />
        ) : isError ? (
          <TaskErrorState message={error} />
        ) : (
          <div className="flex h-full">
            <div className="w-[65%] flex flex-col justify-between h-full">
              <div className="bg-[#FFFFFF]">
                <TaskDetailsHeader task={task} />
                <TaskDescription task={task} />
              </div>

              <TaskFooter onClose={onClose} />
            </div>

            <div className="w-[35%] bg-[#F1F3FF] border-l border-l-[#E8EDFF] py-6 px-4">
              <TaskStatusSelect />
              <TaskAssignee task={task} />
              <TaskReporter task={task} />
              <TaskDates task={task} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
