import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import axios from "axios";

export interface IUsers {
  userId: number;
  username: string;
  email: string;
  password: string;
  exp: number;
  iat: number;
}
export interface AuthState {
  status: number;
  message: string;
  isAuthenticated: boolean;
  user: IUsers[];
  members: IUsers[];
  token: string;
  isLoading: boolean;
}

export interface ICreateAccountProps {
  username: string;
  email: string;
  workspace: string;
  password: string;
}

export interface ILogInProps {
  email: string;
  password: string;
}

const initialState: AuthState = {
  status: 0,
  message: "",
  isAuthenticated: false,
  user: [],
  members: [],
  token: "",
  isLoading: false,
};

export const createAccount = createAsyncThunk(
  "auth/createAccount",
  async (user: ICreateAccountProps) => {
    try {
      const data = await axios.post(
        "http://localhost:9000/api/auth/registration",
        user
      );
      return { status: data.status, message: data.data.message };
    } catch (error: any) {
      if (
        error.response &&
        error.response.data.message &&
        error.response.status
      ) {
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (user: ILogInProps) => {
    try {
      const data = await axios.post(
        "http://localhost:9000/api/auth/login",
        user
      );
      return data.data;
    } catch (error: any) {
      if (
        error.response &&
        error.response.data.message &&
        error.response.status
      ) {
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    }
  }
);

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (token: string) => {
    try {
      const data = await axios.post(
        "http://localhost:9000/api/auth/verifytoken",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.data;
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
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    isAuth: (state) => {
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
        if (!action.payload) return;
        if (action.payload.status && action.payload.message) {
          state.message = action.payload.message;
          state.status = action.payload.status;
        }
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
          state.token = action.payload.token;
        }
      })
      .addCase(logIn.rejected, (state) => {});
    builder
      .addCase(createAccount.pending, (state) => {})
      .addCase(createAccount.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(createAccount.rejected, (state) => {});
    builder
      .addCase(verifyToken.pending, (state) => {})
      .addCase(verifyToken.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.user = action.payload;
      })
      .addCase(verifyToken.rejected, (state) => {});
  },
});

export const { isAuth, logout, setMessage, setStatus } = authSlice.actions;

export default authSlice.reducer;
