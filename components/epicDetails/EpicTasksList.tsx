"use client";

import { useParams, useRouter } from "next/navigation";
import { Task } from "./EpicModalDetails";
import EpicTaskCard from "./EpicTaskCard";
import EpicTaskCardMobile from "./EpicTaskCardMobile";
import PlusTaskIcon from "../icons/PlusTaskIcon";

type Props = {
  tasks: Task[];
};
export default function EpicTasksList({ tasks }: Props) {
  const params = useParams();
  const projectId = params.projectId as string;
  const router = useRouter();
  return (
    <div className=" p-6">
      <div className="mt-2 border hidden sm:block border-gray-200 rounded-xl divide-y divide-gray-200 ">
        {tasks.map((task) => (
          <EpicTaskCard task={task} key={task.id} />
        ))}
      </div>
      <div className="sm:hidden ">
        {tasks.map((task) => (
          <EpicTaskCardMobile task={task} key={task.id} />
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
