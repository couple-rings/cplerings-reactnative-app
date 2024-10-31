import axios from "src/config/axios.main";

export const getAccountProfile = () => {
  return axios.get<unknown, IResponse<IProfileResponse>>(
    `accounts/profile/current`
  );
};
