"use client";
import HeaderStatusColumn from "./HeaderStatusColumn";
import AddNewTask from "./AddNewTask";
import TaskCard from "./TaskCard";
import { Task } from "../epicDetails/EpicModalDetails";
import { useAppDispatch } from "@/app/store/hooks";
import { setOpenTaskModal, setSelectedTaskId } from "@/app/store/features/ui/uiSlice";
import StatusColumn from "./StatusColumn";

type OneStatus = {
  name: string;
  key: string;
  tasks: Task[];

  loading: boolean;
  loaded: boolean;

  offset: number;
  totalCount: number;

  hasMore: boolean;
  loadingMore: boolean;
};

type Props = {
  boardData: OneStatus[];
  loadStatusTasks: (status: string) => Promise<void>;
  loadMoreStatusTasks: (status: string) => Promise<void>;
};

export default function TasksBoardView({ boardData, loadStatusTasks, loadMoreStatusTasks }: Props) {
  return (
    <div className="mt-4 overflow-x-auto">
      <div className="flex gap-4 w-max">
        {boardData?.map((status) => (
          <StatusColumn
            key={status.key}
            status={status}
            loadStatusTasks={loadStatusTasks}
            loadMoreStatusTasks={loadMoreStatusTasks}
          />
        ))}
      </div>
    </div>
  );
}
