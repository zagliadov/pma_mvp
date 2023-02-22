import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import axios from "axios";


export interface IUsers {
  id: string,
  name: string,
  email: string,
  password: string,
}
export interface AuthState {
  isAuthenticated: boolean;
  users: IUsers[];
}

export interface ICreateAccountProps {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface ILogInProps {
  email: string;
  password: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  users: [],
};

export const createAccount = createAsyncThunk(
  "auth/createAccount",
  async (data: ICreateAccountProps) => {
    try {
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (data: ILogInProps) => {
    try {
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string) => {
    console.log(email);
    try {
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {})
      .addCase(forgotPassword.fulfilled, (state) => {})
      .addCase(forgotPassword.rejected, (state) => {});
    builder
      .addCase(logIn.pending, (state) => {})
      .addCase(logIn.fulfilled, (state, action) => {
        
      })
      .addCase(logIn.rejected, (state) => {});
    builder
      .addCase(createAccount.pending, (state) => {})
      .addCase(createAccount.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.users.push(action.payload);
      })
      .addCase(createAccount.rejected, (state) => {});
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
