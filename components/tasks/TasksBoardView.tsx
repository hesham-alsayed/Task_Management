"use client";
import HeaderStatusColumn from "./HeaderStatusColumn";
import AddNewTask from "./AddNewTask";
import TaskCard from "./TaskCard";
import { Task } from "../epicDetails/EpicModalDetails";
import { useAppDispatch } from "@/app/store/hooks";
import { setOpenTaskModal, setSelectedTaskId } from "@/app/store/features/ui/uiSlice";
import StatusColumn from "./StatusColumn";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { BoardItem } from "@/types/task";
import { updateTaskStatusAction } from "@/server-actions/tasks/updateTaskStatus";
import toast from "react-hot-toast";

type Props = {
  boardData: BoardItem[];
  loadStatusTasks: (status: string) => Promise<void>;
  loadMoreStatusTasks: (status: string) => Promise<void>;
  setBoardData: React.Dispatch<React.SetStateAction<BoardItem[]>>;
};

export default function TasksBoardView({
  boardData,
  loadStatusTasks,
  loadMoreStatusTasks,
  setBoardData,
}: Props) {
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !active) return;

    const taskId = active.data.current?.task.id || String(active.id);
    const oldStatus = active.data.current?.currentStatus as string;
    const newStatus = String(over.id);
    console.log(over);
    console.log("dragging", taskId, oldStatus, newStatus);
    if (oldStatus === newStatus) return;

    let taskWillMoved: Task | null = null;
    const prevData = boardData;
    const boardWithoutTask = boardData.map((column) => {
      if (column.key !== oldStatus) return column;

      const existTask = column.tasks.find((task) => task.id === taskId);

      if (existTask) {
        taskWillMoved = {
          ...existTask,
          status: newStatus,
        };
      }

      const filteredTasks = column.tasks.filter((task) => task.id !== taskId);
      return {
        ...column,
        tasks: filteredTasks,
      };
    });

    if (!taskWillMoved) return;

    const updatedBoardData = boardWithoutTask.map((column) => {
      if (column.key !== newStatus) return column;

      const updatedTasks = [...column.tasks, taskWillMoved!];
      return {
        ...column,
        tasks: updatedTasks,
      };
    });

    setBoardData(updatedBoardData);
    console.log("updated success");
    try {
      await updateTaskStatusAction(taskId, { status: newStatus });
    } catch (error: any) {
      toast.error(error.message || "Error in update Status");
      setBoardData(prevData);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  );
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="mt-4 overflow-x-auto">
        <div className="flex gap-4 w-max">
          {boardData?.map((status, index) => (
            <StatusColumn
              key={index}
              status={status}
              loadStatusTasks={loadStatusTasks}
              loadMoreStatusTasks={loadMoreStatusTasks}
              
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
