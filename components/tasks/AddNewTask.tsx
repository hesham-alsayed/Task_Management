"use client";

import { useParams, useRouter } from "next/navigation";
import PlusTaskIcon from "../icons/PlusTaskIcon";

type Props = {
  value: string;
};
export default function AddNewTask({ value }: Props) {
  const params = useParams();
  const projectId = params.projectId as string;
  const router = useRouter();
  return (
    <div className="p-4 -mt-2 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition">
      <PlusTaskIcon />
      <div
        onClick={() => {
          localStorage.setItem("selectedStatus", value);
          router.push(`/project/${projectId}/tasks/new`);
        }}
        className="uppercase font-bold text-[12px] text-[#43465499]"
      >
        add new task
      </div>
    </div>
  );
}
