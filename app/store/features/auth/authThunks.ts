import { getUserAction } from "@/app/server-actions/auth/getUser";
import { login } from "@/app/server-actions/auth/login";
import { logoutAction } from "@/app/server-actions/auth/logout";
import signup, { SignupFormData } from "@/app/server-actions/auth/signup";
import { LoginFormData } from "@/hooks/useLoginForm";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      return await getUserAction();
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to get user");
    }
  },
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (data: SignupFormData, { rejectWithValue }) => {
    try {
      const user = await signup(data);
      return user;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Error in network or server try again later",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: LoginFormData, { rejectWithValue }) => {
    try {
      const user = await login(data);

      return user;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Error in network or server try again later",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const result = await logoutAction();

      return result;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Logout failed");
    }
  },
);
