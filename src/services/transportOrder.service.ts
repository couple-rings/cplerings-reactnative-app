import axios from "src/config/axios.main";
import queryString from "query-string";
import { TransportOrderStatus } from "src/util/enums";

export const getTransportOrders = (queryObj: ITransportOrderFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<ITransportOrder>>>(
    `transportation-orders?${queryUrl}`
  );
};

export const putUpdateOrderOnGoing = (transportationOrderIds: number[]) => {
  return axios.put<
    unknown,
    IResponse<{ transportationOrders: ITransportOrder[] }>
  >(`transportation-orders/ongoing`, { transportationOrderIds });
};

export const putUpdateOrderStatus = (
  id: number,
  status: TransportOrderStatus
) => {
  return axios.put<
    unknown,
    IResponse<{ transportationOrder: ITransportOrder }>
  >(`transportation-orders/${id}/status`, { status });
};
