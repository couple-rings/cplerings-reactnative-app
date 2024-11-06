import axios from "src/config/axios.chat";
import queryString from "query-string";

export const getConversations = (queryObj: IConversationFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, ISecondaryResponse<IConversation[]>>(
    `conversations?${queryUrl}`
  );
};

export const putUpdateConversation = (
  id: string,
  data: IUpdateConversationRequest
) => {
  return axios.put<unknown, ISecondaryResponse<null>>(
    `conversations/${id}`,
    data
  );
};
