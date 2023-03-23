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
  status: number | null;
  message: string;
  workspace_id: number | null;
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
  status: null,
  message: "",
  isAuthenticated: false,
  workspace_id: null,
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
        "http://localhost:9000/auth/registration",
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
      const data = await axios.post("http://localhost:9000/auth/login", user);
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
        "http://localhost:9000/auth/verifytoken",
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
      state.token = "";
      localStorage.removeItem("token");
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
          return {
            ...state,
            message: action.payload.message,
            status: action.payload.status,
          };
        }
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
          return {
            ...state,
            token: action.payload.token,
            workspace_id: action.payload.workspace_id[0].id,
          };
        }
      })
      .addCase(logIn.rejected, (state) => {});
    builder
      .addCase(createAccount.pending, (state) => {})
      .addCase(createAccount.fulfilled, (state, action) => {
        if (!action.payload) return;
        return {
          ...state,
          status: action.payload.status,
          message: action.payload.message,
        };
      })
      .addCase(createAccount.rejected, (state) => {});
    builder
      .addCase(verifyToken.pending, (state) => {})
      .addCase(verifyToken.fulfilled, (state, action) => {
        if (!action.payload) return;
        return { ...state, user: action.payload };
      })
      .addCase(verifyToken.rejected, (state) => {});
  },
});

export const { isAuth, logout, setMessage, setStatus } = authSlice.actions;

export default authSlice.reducer;
