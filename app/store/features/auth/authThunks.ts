import { createAsyncThunk } from "@reduxjs/toolkit";


export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
      });

      if (!res.ok) {
        return thunkAPI.rejectWithValue("refresh_failed");
      }
      const data  = await res.json()
      return data
    } catch  {
      return thunkAPI.rejectWithValue("network_error");
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/api/auth/user");

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || "Failed to get user");
      }

      return data.user;
    } catch {
      return thunkAPI.rejectWithValue("Network error");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      console.log(res)
      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message || "Logout failed");
      }

      return true;
    } catch {
      return thunkAPI.rejectWithValue("Network error");
    }
  },
);
