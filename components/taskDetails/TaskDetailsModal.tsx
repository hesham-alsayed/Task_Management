"use client";

import TaskDetailsModalSkeleton from "@/components/skeleton/TaskDetailsModalSkeleton";
import { BoardItem, ITaskDetails } from "@/types/task";
import TaskDetailsHeader from "./TaskDetailsHeader";
import TaskDescription from "./TaskDescription";
import TaskFooter from "./TaskFooter";
import TaskStatusSelect from "./TaskStatusSelect";
import TaskAssignee from "./TaskAssignee";
import TaskReporter from "./TaskReporter";
import TaskDates from "./TaskDates";
import TaskErrorState from "./TaskErrorState";
import { Field, MemberOptions } from "@/hooks/useTaskForm";
import { Epic } from "@/hooks/useGetAllEpics";
import { Task } from "../epicDetails/EpicModalDetails";

type Props = {
  onClose: () => void;
  task: ITaskDetails | null;
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;
  loadingUpdate: boolean;
  updateField: (field: Field, value: string | null) => Promise<void>;
  epics: Epic[];
  membersOptions: MemberOptions[];
};

export default function TaskDetailsModal({
  onClose,
  task,
  isLoading,
  error,
  isOpen,
  updateField,
  epics,
  membersOptions,
}: Props) {
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
                <TaskDetailsHeader  epics={epics} task={task} updateField={updateField} />
                <TaskDescription task={task} updateField={updateField} />
              </div>

              <TaskFooter onClose={onClose} />
            </div>

            <div className="w-[35%] bg-[#F1F3FF] border-l border-l-[#E8EDFF] py-6 px-4">
              <TaskStatusSelect updateField={updateField} />
              <TaskAssignee membersOptions={membersOptions} task={task} updateField={updateField} />
              <TaskReporter task={task} />
              <TaskDates updateField={updateField} task={task} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
