import { TransportOrderStatus } from "./enums";

export const sizeConverter = (bytes: number | undefined) => {
  if (!bytes) return "";

  if (bytes / Math.pow(1024, 1) >= 1024)
    return `${(bytes / Math.pow(1024, 2)).toFixed(2)} MB`;
  else return `${(bytes / Math.pow(1024, 1)).toFixed(2)} KB`;
};

export const appendDataTypeBase64 = (base64: string, mimeType: string) => {
  return `data:${mimeType};base64,${base64}`;
};

export const formatStatus = (status: TransportOrderStatus | string) => {
  if (status === "All") return "Tất Cả";

  if (status === TransportOrderStatus.Waiting) return "Chưa Bắt Đầu";

  if (status === TransportOrderStatus.Rejected) return "Thất Bại";

  if (status === TransportOrderStatus.OnGoing) return "Chuẩn Bị";

  if (status === TransportOrderStatus.Delivering) return "Đang Giao";

  if (status === TransportOrderStatus.Redelivering) return "Chờ Giao Lại";

  return "Hoàn Thành";
};

export const formatStatusColor = (status: TransportOrderStatus | string) => {
  if (status === TransportOrderStatus.Waiting) return "#f1c40f";

  if (status === TransportOrderStatus.Rejected) return "#e74c3c";

  if (status === TransportOrderStatus.OnGoing) return "#f1c40f";

  if (status === TransportOrderStatus.Delivering) return "#3498db";

  if (status === TransportOrderStatus.Redelivering) return "#f1c40f";

  return "#07bc0c";
};

export const getDiamondSpec = (item: IDiamondSpec) => {
  return `${item.shape} ${item.weight * 100}PT ,${item.color} ,${item.clarity}`;
};
