import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, refreshToken, logoutUser } from "./authThunks";

type AuthState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;

  status: "loading" | "authenticated" | "unauthenticated";

  loading: boolean;

  error: string | null;

  logoutLoading: boolean;
  logoutError: string | null;
};

const initialState: AuthState = {
  user: null,
  status: "loading",

  loading: false,
  error: null,

  logoutLoading: false,
  logoutError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "unauthenticated";
    },
  },
  extraReducers: (builder) => {
    // ================= GET USER =================
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user_metadata;
        state.status = "authenticated";
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.status = "unauthenticated";
        state.error = (action.payload as string) || "Unknown error";
      });

    // ================= REFRESH =================
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload.user_metadata;
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.user = null;
        state.status = "unauthenticated";
        state.error = (action.payload as string) || "Refresh failed";
      });

    // ================= LOGOUT =================
    builder
      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
        state.logoutError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutLoading = false;
        state.user = null;
        state.status = "unauthenticated";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = (action.payload as string) || "Logout failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
