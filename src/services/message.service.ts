import queryString from "query-string";
import axios from "src/config/axios.chat";

export const putUpdateMessage = (id: string, data: IUpdateMessageRequest) => {
  return axios.put<unknown, ISecondaryResponse<null>>(`messages/${id}`, data);
};

export const getMessages = (queryObj: IMessageFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<
    unknown,
    ISecondaryResponse<ISecondaryListResponse<IMessage[]>>
  >(`messages?${queryUrl}`);
};
