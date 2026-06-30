"use client";

import { ITaskDetails } from "@/types/task";
import TaskHeaderMobile from "./TaskHeaderMobile";
import TaskStatusMobile from "./TaskStatusMobile";
import TaskInfoMobile from "./TaskInfoMobile";
import TaskDetailsSkeletonMobile from "@/components/skeleton/TaskDetailsSkeletonMobile";
import TaskErrorState from "./TaskErrorState";
import { Field, MemberOptions } from "@/hooks/useTaskForm";
import { Epic } from "@/hooks/useGetAllEpics";
import TaskDescription from "./TaskDescription";

type Props = {
  onClose: () => void;
  task: ITaskDetails | null;
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;
  updateField: (field: Field, value: string | null) => Promise<void>;
  epics: Epic[];
  membersOptions: MemberOptions[];
};

export default function TaskDetailsModalMobile({
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
              <TaskStatusMobile epics={epics} updateField={updateField} />
              <TaskInfoMobile
                membersOptions={membersOptions}
                updateField={updateField}
                task={task}
              />
              <TaskDescription task={task} updateField={updateField} mobile={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
