"use client";
import HeaderStatusColumn from "./HeaderStatusColumn";
import AddNewTask from "./AddNewTask";
import TaskCard from "./TaskCard";
import { Task } from "../epicDetails/EpicModalDetails";

type OneStatus = {
  name: string;
  tasks: Task[];
  key: string;
};

type Props = {
  formattedData: OneStatus[];
};

export default function TasksBoardView({ formattedData }: Props) {
  return (
    <div className="mt-4 overflow-x-auto">
      <div className="flex gap-4 w-max">
        {formattedData.map((status: any) => (
          <div key={status.key} className="w-[320px] flex-shrink-0">
            <HeaderStatusColumn
              status={status.name}
              value={status.key}
              count={status.tasks.length}
            />

            <div className="mt-3 flex flex-col gap-3">
              <AddNewTask value={status.key} />

              {status.tasks.map((task: any) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
