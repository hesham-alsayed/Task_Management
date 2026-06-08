import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, logoutUser, signupUser, loginUser } from "./authThunks";

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(getCurrentUser.fulfilled, (state, action) => {
  state.loading = false; 
  console.log(action.payload)
  state.user = action.payload.user_metadata;
  state.status = "authenticated";
})

.addCase(getCurrentUser.rejected, (state, action) => {
  state.loading = false;
  state.user = null;
  state.status = "unauthenticated";
  state.error =
    (action.payload as string) || "Error in get user";
});

    builder
      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
        state.logoutError = null; 
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = (action.payload as string) || "Logout failed";
      })
  .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false; 
        console.log(action.payload)
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false; 
        console.log(action)
        state.error = (action.payload as string) || "Signup failed";
      })
  .addCase(loginUser.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(loginUser.fulfilled, (state, action) => {
    state.loading = false; 
    console.log(action.payload)
    state.user = action.payload;
  })
  .addCase(loginUser.rejected, (state, action) => {
    state.loading = false;
    state.error =
      (action.payload as string) || "Login failed";
  });
  },
});

export const {  } = authSlice.actions;
export default authSlice.reducer;
