"use client";

import { useParams, useRouter } from "next/navigation";
import { Task } from "./EpicModalDetails";
import EpicTaskCard from "./EpicTaskCard";
import EpicTaskCardMobile from "./EpicTaskCardMobile";
import PlusTaskIcon from "../icons/PlusTaskIcon";
import { useAppDispatch } from "@/app/store/hooks";
import {
  setOpenEpicModal,
  setOpenTaskModal,
  setSelectedTaskId,
} from "@/app/store/features/ui/uiSlice";
import TaskDetailsModal from "@/hooks/taskDetails/TaskDetailsModal";

type Props = {
  tasks: Task[];
};
export default function EpicTasksList({ tasks }: Props) {
  const params = useParams();
  const projectId = params.projectId as string;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleTaskClick = (taskId: string) => {
    dispatch(setSelectedTaskId(taskId));
    dispatch(setOpenTaskModal(true));
    dispatch(setOpenEpicModal(false));
  };
  return (
    <div className=" p-6">
      <div className="mt-2 border hidden sm:block border-gray-200 rounded-xl divide-y divide-gray-200 ">
        {tasks.map((task) => (
          <div
            onClick={() => handleTaskClick(task.id)}
            key={task.id}
            className="hover:cursor-pointer"
          >
            <EpicTaskCard task={task} />
          </div>
        ))}
      </div>
      <div className="sm:hidden ">
        {tasks.map((task) => (
          <div
            className="hover:cursor-pointer"
            key={task.id}
            onClick={() => handleTaskClick(task.id)}
          >
            <EpicTaskCardMobile task={task} />
          </div>
        ))}
        <div className="mt-8 p-6 border border-dashed border-gray-300 rounded-lg flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition">
          <PlusTaskIcon />
          <div
            onClick={() => router.push(`/project/${projectId}/tasks/new`)}
            className="uppercase font-bold text-[12px] text-[#43465499]"
          >
            add new task
          </div>
        </div>
      </div>
    </div>
  );
}
