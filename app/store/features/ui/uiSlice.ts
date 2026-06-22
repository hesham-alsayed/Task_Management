import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  sidebarCollapsed: boolean;
  openEpicModal: boolean;
  selectedEpicId: string | null;
  openTaskModal: boolean;
  selectedTaskId: string | null;
};

const initialState: UIState = {
  sidebarCollapsed: false,
  openEpicModal: false,
  selectedEpicId: null,
  openTaskModal: false,
  selectedTaskId: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },

    setOpenEpicModal: (state, action: PayloadAction<boolean>) => {
      state.openEpicModal = action.payload;
    },

    setSelectedEpicId: (state, action: PayloadAction<string | null>) => {
      state.selectedEpicId = action.payload;
    },
    setOpenTaskModal: (state, action: PayloadAction<boolean>) => {
      state.openTaskModal = action.payload;
    },

    setSelectedTaskId: (state, action: PayloadAction<string | null>) => {
      state.selectedTaskId = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setOpenEpicModal,
  setSelectedEpicId,
  setOpenTaskModal,
  setSelectedTaskId,
} = uiSlice.actions;

export default uiSlice.reducer;
