import { Task } from "@/components/epicDetails/EpicModalDetails";
import { BoardItem } from "@/types/task";
import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  globalBoardData: BoardItem[];
  globalListData: Task[];
};

const initialState: initialState = {
  globalBoardData: [],
  globalListData: [],
};
export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setGlobalBoardData: (state, action) => {
      state.globalBoardData = action.payload;
    },
    setGlobalListData: (state, action) => {
      state.globalListData = action.payload;
    },

    updateTaskinBoardData: (state, action) => {
      const { task } = action.payload;

      state.globalBoardData = state.globalBoardData.map((column) => ({
        ...column,
        tasks: column.tasks.map((item) => (item.id === task.id ? task : item)),
      }));
    },

    moveTaskToStatus: (state, action) => {
      const { task, oldStatus } = action.payload;

      let taskWillMoved: Task | null = null;

      const boardWithoutTask = state.globalBoardData.map((column) => {
        if (column.key !== oldStatus) return column;

        const existTask = column.tasks.find((t) => t.id === task.id);

        if (existTask) {
          taskWillMoved = {
            ...existTask,
            ...task,
          };
        }

        return {
          ...column,
          tasks: column.tasks.filter((t) => t.id !== task.id),
        };
      });

      if (!taskWillMoved) return;

      const updatedBoardData = boardWithoutTask.map((column) => {
        if (column.key !== task.status) return column;

        return {
          ...column,
          tasks: [...column.tasks, taskWillMoved!],
        };
      });

      state.globalBoardData = updatedBoardData;
    },
    updateTaskinListData: (state, action) => {
      const { taskId, taskData } = action.payload;
      const listData = state.globalListData;
      const updatedListData = listData.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            ...taskData,
          };
        }
        return task;
      });
      state.globalListData = updatedListData;
    },
  },
});

export const {
  setGlobalBoardData,
  setGlobalListData,
  updateTaskinBoardData,
  updateTaskinListData,
  moveTaskToStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;
