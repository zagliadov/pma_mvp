import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import axios from "axios";

interface IInitialState {
  userLanguage: string;
  userTimezone: string;
  userFirstname: string;
  userLastname: string;
  userEmail: string;
  userPhone: string;
  userPhoto: any;
  user: any;
}
const initialState: IInitialState = {
  userLanguage: "English",
  userTimezone: "EST",
  userFirstname: "",
  userLastname: "",
  userEmail: "",
  userPhone: "".replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'),
  userPhoto: null,
  user: [],
};

export const uploadPhoto = createAsyncThunk(
  "user/upload_photo",
  async ({ token, file }: any) => {
    try {
      const formData = new FormData();
      formData.append("File", file);
      const { data } = await axios.post(
        "http://localhost:9000/user_settings/upload_photo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data?.avatar_filename;
    } catch (error) {
      console.log(error);
    }
  }
);

export const downloadPhoto = createAsyncThunk(
  "user/user_avatar",
  async (userPhoto: string) => {
    console.log(userPhoto);
    try {
      await axios.get(
        `http://localhost:9000/user_settings/user_avatar/${userPhoto}`
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAvatarFilename = createAsyncThunk(
  "user/get_avatar_filename",
  async (token: string) => {
    try {
      const data = await axios.post(
        `http://localhost:9000/user_settings/user_avatar/get_avatar_filename`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.data.avatar_filename;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeUserAvatar = createAsyncThunk(
  "user/remove_user_avatar",
  async (token: string) => {
    try {
      await axios.post(
        `http://localhost:9000/user_settings/user_avatar/remove_user_avatar`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const getVerifyUser = createAsyncThunk(
  "user/get_verify_user",
  async (token: string) => {
    try {
      try {
        const user = await axios.post(
          "http://localhost:9000/user_settings/get_verify_user",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return user.data;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSettingsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLanguage(state, action) {
      return { ...state, userLanguage: action.payload };
    },
    setUserTimezone(state, action) {
      return { ...state, userTimezone: action.payload };
    },
    setUserFirstname(state, action) {
      return { ...state, userFirstname: action.payload };
    },
    setUserLastname(state, action) {
      return { ...state, userLastname: action.payload };
    },
    setUserEmail(state, action) {
      return { ...state, userEmail: action.payload };
    },
    setUserPhone(state, action) {
      return { ...state, userPhone: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPhoto.pending, (state, action) => {})
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        return { ...state, userPhoto: action.payload };
      })
      .addCase(uploadPhoto.rejected, (state) => {});
    builder
      .addCase(getAvatarFilename.pending, (state, action) => {})
      .addCase(getAvatarFilename.fulfilled, (state, action) => {
        return { ...state, userPhoto: action.payload };
      })
      .addCase(getAvatarFilename.rejected, (state) => {});
    // builder
    //   .addCase(downloadPhoto.pending, (state, action) => {})
    //   .addCase(downloadPhoto.fulfilled, (state, action) => {
    //     // return { ...state, photoUrl: action.payload };
    //   })
    //   .addCase(downloadPhoto.rejected, (state) => {});
    builder
      .addCase(getVerifyUser.pending, (state) => {})
      .addCase(getVerifyUser.fulfilled, (state, action) => {
        if (!action.payload) return;
        return { ...state, user: action.payload };
      })
      .addCase(getVerifyUser.rejected, (state) => {});
    builder
      .addCase(removeUserAvatar.pending, (state) => {})
      .addCase(removeUserAvatar.fulfilled, (state, action) => {
        return { ...state, userPhoto: null };
      })
      .addCase(removeUserAvatar.rejected, (state) => {});
  },
});

export const {
  setUserLanguage,
  setUserTimezone,
  setUserFirstname,
  setUserLastname,
  setUserEmail,
  setUserPhone,
} = userSettingsSlice.actions;

export default userSettingsSlice.reducer;
