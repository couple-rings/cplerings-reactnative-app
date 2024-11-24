import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "src/util/enums";

export interface IInitState {
  isAuthenticated: boolean;

  userInfo: {
    id: number;
    email: string;
    username: string;
    phone: string;
    avatar: string;
    branchId: number;
    hasSpouse: boolean;
    role: UserRole;
  };

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

export interface ISaveProfilePayload extends Partial<IProfileResponse> {
  hasSpouse: boolean;
}

export interface ISaveTokenPayload extends IRefreshTokenResponse {}

const initialState: IInitState = {
  isAuthenticated: false,

  userInfo: {
    id: 0,
    email: "",
    username: "",
    phone: "",
    avatar: "",
    branchId: 0,
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
      const { hasSpouse, account } = payload;

      if (account) {
        const { phone, avatar, branch, ...rest } = account;

        if (phone) state.userInfo.phone = phone;
        if (avatar) state.userInfo.avatar = avatar;
        if (branch) state.userInfo.branchId = branch.id;

        state.userInfo = { ...state.userInfo, hasSpouse, ...rest };
      } else state.userInfo = { ...state.userInfo, hasSpouse };
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
