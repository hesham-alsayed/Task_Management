import { Epic } from "@/hooks/useGetAllEpics";
import { createSlice } from "@reduxjs/toolkit";

type EpicsState = {
  epics: Epic[];
};

const initialState: EpicsState = {
  epics: [],
};
export const epicsSlice = createSlice({
  name: "epics",
  initialState,
  reducers: {
    setAllEpics: (state, action) => {
      state.epics = action.payload;
    },
  },
});

export const { setAllEpics } = epicsSlice.actions;

export default epicsSlice.reducer;