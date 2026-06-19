"use client";

import { useParams, useRouter } from "next/navigation";
import PlusTaskIcon from "../icons/PlusTaskIcon";
import PlusIcon from "../icons/PlusIcon";

type Props = {
  projectId?: string;
};

export default function TasksEmptyState({ projectId }: Props) {
  const router = useRouter();
  const params = useParams();

  const currentProjectId = projectId || (params.projectId as string);

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <h2 className="mt-6 text-2xl font-semibold text-main">No Tasks Found Your Project Tasks List are Empty</h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-[#64748B]">
        Your workboard is empty. Create your first task to start planning,
        tracking progress, and organizing your workflow.
      </p>

      <button
        onClick={() => router.push(`/project/${currentProjectId}/tasks/new`)}
        className="mt-8 hover:cursor-pointer w-[200px] flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        <PlusIcon />
        <span>Create Task</span>
      </button>
    </div>
  );
}
