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

export const getTransportOrderDetail = (id: number) => {
  return axios.get<
    unknown,
    IResponse<{ transportationOrder: ITransportOrder }>
  >(`transportation-orders/${id}`);
};

export const putUpdateOrderImage = (orderId: number, imageId: number) => {
  return axios.put<
    unknown,
    IResponse<{ transportationOrders: ITransportOrder }>
  >(`transportation-orders/${orderId}/delivery-image`, { imageId });
};

export const postCreateNote = (data: ICreateNoteRequest) => {
  return axios.post<unknown, IResponse<ITransportNote>>(
    `transportation-orders/notes`,
    data
  );
};
