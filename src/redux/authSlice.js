import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate } from "react-router";

const initialState = {
  user: JSON.parse(localStorage.getItem("memberInfo")) || "",
  users: [],
  isLoading: false,
  error: null,
};

export const getUsers = createAsyncThunk("auth/getUsers", async () => {
  let res = await axios.get(
    "https://68457ab9fc51878754db71db.mockapi.io/users"
  );
  let data = await res.data;
  return data;
});

export const register = createAsyncThunk("auth/register", async (data) => {
  let res = await axios.post(
    "https://68457ab9fc51878754db71db.mockapi.io/users",
    {
      username: data.username,
      email: data.email,
      password: data.password,
      role: "student",
    }
  );
});
export const addTeacher = createAsyncThunk("auth/addTeacher", async (data) => {
  let res = await axios.post(
    "https://68457ab9fc51878754db71db.mockapi.io/users",
    {
      username: data.username,
      email: data.email,
      password: data.password,
      role: "teacher",
    }
  );
});

export const login = createAsyncThunk("auth/login", async (data) => {
  return data;
});
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("memberInfo");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(addTeacher.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addTeacher.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload, "pay");
        state.isLoading = false;
        localStorage.setItem(
          "memberInfo",
          JSON.stringify({
            username: action.payload.username,
            email: action.payload.email,
            role: action.payload.role,
          })
        );
        state.user = action.payload;
      });

    builder
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = "";
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
