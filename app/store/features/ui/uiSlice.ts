import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  sidebarCollapsed: boolean;
  openEpicModal: boolean;
  selectedEpicId: string | null;
};

const initialState: UIState = {
  sidebarCollapsed: false,
  openEpicModal: false,
  selectedEpicId: null,
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
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setOpenEpicModal,
  setSelectedEpicId,
} = uiSlice.actions;

export default uiSlice.reducer;
