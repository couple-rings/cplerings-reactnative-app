import axios from "src/config/axios.main";

export const postLogin = (data: ILoginRequest) => {
  return axios.post<unknown, IResponse<ILoginResponse>>(`auth/login`, data);
};

export const postRefreshToken = (data: IRefreshTokenRequest) => {
  return axios.post<unknown, IResponse<IRefreshTokenResponse>>(
    `auth/refresh`,
    data
  );
};
