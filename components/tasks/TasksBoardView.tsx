"use client";
import HeaderStatusColumn from "./HeaderStatusColumn";
import AddNewTask from "./AddNewTask";
import TaskCard from "./TaskCard";
import { Task } from "../epicDetails/EpicModalDetails";
import { useAppDispatch } from "@/app/store/hooks";
import { setOpenTaskModal, setSelectedTaskId } from "@/app/store/features/ui/uiSlice";

type OneStatus = {
  name: string;
  tasks: Task[];
  key: string;
};

type Props = {
  boardData: OneStatus[];
};

export default function TasksBoardView({ boardData }: Props) {
  const dispatch = useAppDispatch();
  const handleTaskClick = (taskId: string) => {
    dispatch(setSelectedTaskId(taskId));
    dispatch(setOpenTaskModal(true));
  };

  return (
    <div className="mt-4 overflow-x-auto">
      <div className="flex gap-4 w-max">
        {boardData.map((status: any) => (
          <div key={status.key} className="w-[320px] flex-shrink-0">
            <HeaderStatusColumn
              status={status.name}
              value={status.key}
              count={status.tasks.length}
            />

            <div className="mt-3 flex flex-col gap-3">
              <AddNewTask value={status.key} />

              {status.tasks.map((task: any) => (
                <div className="hover:cursor-pointer" key={task.id} onClick={() => handleTaskClick(task.id)}>
                  <TaskCard task={task} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
