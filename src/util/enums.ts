export enum ButtonVariant {
  Contained = "CONTAINED",
  Outlined = "OUTLINED",
}

export enum UserRole {
  Default = "",
  Customer = "CUSTOMER",
  Staff = "STAFF",
  Manager = "MANAGER",
  Jeweler = "JEWELER",
  Admin = "ADMIN",
  Transporter = "TRANSPORTER",
}

export enum ResponseType {
  Data = "DATA",
  Error = "ERROR",
  Info = "INFO",
  Paginated = "PAGINATED_DATA",
}

export enum ErrorType {
  Validation = "VALIDATION",
  Business = "BUSINESS",
}

export enum ErrorCode {
  UnVerifiedAccount = "012",
  JwtExpired = "008",
}

export enum OrderStatus {
  Waiting = "WAITING",
  OnGoing = "ON GOING",
  Fulfilled = "FULFILLED",
  NotFulfilled = "NOT FULFILLED",
}

export enum FailReason {
  NotMet = "NOT MET",
  Rejected = "REJECTED",
}

export enum FileType {
  Image = "image",
  Attachment = "attachment",
}

export enum TransportOrderStatus {
  Pending = "PENDING",
  Waiting = "WAITING",
  OnGoing = "ON_GOING",
  Delivering = "DELIVERING",
  Rejected = "REJECTED",
  Completed = "COMPLETED",
  Failed = "FAILED",
}

export enum CustomOrderStatus {
  Pending = "PENDING",
  Waiting = "WAITING",
  InProgress = "IN_PROGRESS",
  Done = "DONE",
  Delivering = "DELIVERING",
  Completed = "COMPLETED",
  Canceled = "CANCELED",
}

export enum RingStatus {
  NotAvailable = "NOT_AVAIL",
  Available = "AVAILABLE",
  Refunded = "REFUNDED",
  Resold = "RESOLD",
}

export enum VersionOwner {
  Self = "SELF",
  Partner = "PARTNER",
}

export enum DesignCharacteristic {
  Default = "",
  Male = "MASCULINE",
  Female = "FEMININE",
}

export enum GoldColor {
  White = "WHITE",
  Rose = "ROSE",
  Yellow = "YELLOW",
}
