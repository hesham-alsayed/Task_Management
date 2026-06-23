"use client";

import { Task } from "@/components/epicDetails/EpicModalDetails";
import { formatDate } from "@/lib/helper/formate-date";
import { getShortName } from "@/lib/helper/get-shortname";
import StatusBadge from "./StatusBadge";
import UnAssignedIcon from "../icons/UnAssignedIcon";
import ThreeDotsHorizontalIcon from "../icons/ThreeDotsHorizontalIcon";
import PrevArrow from "../icons/PrevArrow";
import NextArrow from "../icons/NextArrow";
import { useAppDispatch } from "@/app/store/hooks";
import { setOpenTaskModal, setSelectedTaskId } from "@/app/store/features/ui/uiSlice";
import PlusIcon from "../icons/PlusIcon";
import Link from "next/link";
import { useParams } from "next/navigation";

type Props = {
  tasks: Task[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalCount: number;
  totalPages: number;
  page: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
};

export default function TasksListView({
  tasks,
  hasNextPage,
  hasPrevPage,
  totalCount,
  totalPages,
  page,
  handleNextPage,
  handlePrevPage,
}: Props) {
  const params = useParams();
  const projectId = params.projectId as string;
  const dispatch = useAppDispatch();
  const handleTaskClick = (taskId: string) => {
    dispatch(setSelectedTaskId(taskId));
    dispatch(setOpenTaskModal(true));
  };
  return (
    <div className=" mt-6 overflow-x-auto w-full  ">
      <table className="w-full  min-w-[1000px] ">
        <thead className="bg-[#F1F3FF80]">
          <tr className=" text-left text-[11px] font-bold text-[#434654] uppercase">
            <th className="px-6 py-4 whitespace-nowrap">Task ID</th>
            <th className="px-6 py-4 whitespace-nowrap">Title</th>
            <th className="px-6 py-4 whitespace-nowrap">Status</th>
            <th className="px-6 py-4 whitespace-nowrap">Due Date</th>
            <th className="px-6 py-4 whitespace-nowrap">Assignee</th>
            <th className="w-12"></th>
          </tr>
        </thead>

        <tbody className="bg-[#FFFFFF] ">
          {tasks.map((task) => (
            <tr
              key={task.id}
              onClick={() => handleTaskClick(task.id)}
              className="border-t hover:cursor-pointer border-gray-100 hover:bg-gray-50 "
            >
              <td className="px-6 py-5">
                <span className="text-[12px] font-normal text-primary whitespace-nowrap">
                  {task.task_id}
                </span>
              </td>

              <td className="px-6 py-5">
                <p className="max-w-md text-sm font-medium text-main">{task.title}</p>
              </td>

              <td className="px-6 py-5 whitespace-nowrap">
                <StatusBadge status={task.status} />
              </td>

              <td className="px-6 py-5 font-normal text-sm text-[#434654] whitespace-nowrap">
                {task.due_date ? formatDate(task.due_date) : "No due date"}
              </td>

              <td className="px-6 py-5 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DAE2FF] text-xs font-semibold text-main">
                    {task.assignee?.name ? getShortName(task.assignee.name) : <UnAssignedIcon />}
                  </div>

                  <span className="text-sm text-slate-700">
                    {task.assignee?.name || "Unassigned"}
                  </span>
                </div>
              </td>

              <td className="px-3 py-5">
                <button>
                  <ThreeDotsHorizontalIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex min-w-[1000px] py-6 items-center justify-between rounded-b-2xl bg-[#FFFFFF] border-t border-gray-100 px-6 ">
        <p className="text-sm text-slate-500">
          Showing {tasks.length} of {totalCount} tasks
        </p>

        <div className="flex items-center gap-4 font-medium text-[12px] text-[#434654]">
          <button
            disabled={!hasPrevPage}
            onClick={handlePrevPage}
            className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
              hasPrevPage ? "cursor-pointer hover:bg-gray-100" : "cursor-not-allowed opacity-40"
            }`}
          >
            <PrevArrow />
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={!hasNextPage}
            onClick={handleNextPage}
            className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
              hasNextPage ? "cursor-pointer hover:bg-gray-100" : "cursor-not-allowed opacity-40"
            }`}
          >
            <NextArrow />
          </button>
        </div>
      </div>
      <div className="fixed bottom-6 right-6 ">
        <Link
          href={`/project/${projectId}/tasks/new`}
          className="btn-primary rounded-lg py-7 px-6 flex items-center justify-center gap-2"
        >
          <PlusIcon />
        </Link>
      </div>
    </div>
  );
}
