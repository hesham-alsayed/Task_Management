import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import uiReducer from "./features/ui/uiSlice";
import epicsReducer from "./features/epics/epicsSlice";
import tasksSlice from "./features/tasks/taskSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    epics: epicsReducer,
    tasks: tasksSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
