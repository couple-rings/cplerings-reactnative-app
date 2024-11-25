import axios from "src/config/axios.main";
import queryString from "query-string";

export const getVerifySpouse = (
  citizenId: string,
  queryObj: { customerId: number }
) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<{ spouse: ISpouse }>>(
    `spouses/${citizenId}?${queryUrl}`
  );
};
