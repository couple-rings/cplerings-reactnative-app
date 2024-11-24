import axios from "src/config/axios.main";

export const getVerifySpouse = (citizenId: string) => {
  return axios.get<unknown, IResponse<{ spouses: ISpouse }>>(
    `spouses/${citizenId}`
  );
};
