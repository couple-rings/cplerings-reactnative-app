import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "src/util/enums";

export interface IInitState {
  isAuthenticated: boolean;

  userInfo: IUser;

  accessToken: string;

  refreshToken: string;
}

export interface ILoginPayload {
  id: number;
  email: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
}

export interface ISaveProfilePayload extends Partial<IProfileResponse> {}

export interface ISaveTokenPayload extends IRefreshTokenResponse {}

const initialState: IInitState = {
  isAuthenticated: false,

  userInfo: {
    id: 0,
    email: "",
    username: "",
    phone: "",
    avatar: "",
    hasSpouse: false,
    role: UserRole.Default,
  },

  accessToken: "",

  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<ILoginPayload>) => {
      const { accessToken, refreshToken, ...rest } = payload;
      state.isAuthenticated = true;
      state.userInfo = { ...state.userInfo, ...rest };
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = initialState.userInfo;
      state.accessToken = "";
      state.refreshToken = "";
    },
    saveProfile: (state, { payload }: PayloadAction<ISaveProfilePayload>) => {
      const { phone, avatar, ...rest } = payload;
      if (phone) state.userInfo.phone = phone;
      if (avatar) state.userInfo.avatar = avatar;
      state.userInfo = { ...state.userInfo, ...rest };
    },
    saveToken: (state, { payload }: PayloadAction<ISaveTokenPayload>) => {
      const { refreshToken, token: accessToken } = payload;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, saveProfile, saveToken } = authSlice.actions;

export default authSlice.reducer;
