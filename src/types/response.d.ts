import { ErrorType, ResponseType, UserRole } from "src/util/enums";

export {};

declare global {
  interface IResponseError {
    code: string;
    description: string;
    type: ErrorType;
  }

  interface IResponse<T> {
    timestamp: string;
    type: ResponseType;
    errors?: IResponseError[];
    data?: T;
  }

  interface IListMetaData {
    page: number;
    pageSize: number;
    totalPages: number;
    count: number;
  }

  interface IListResponse<T> extends IListMetaData {
    items: T[];
  }

  interface ISecondaryResponse<T> {
    statusCode: number;

    message?: string;

    error?: string | string[];

    data?: T | null;
  }

  interface ISecondaryListResponse<T> {
    currentPage: number;

    pageSize: number;

    totalPages: number;

    totalItems: number;

    items: T;
  }

  interface IFptResponse<T> {
    errorCode: number;

    data: T;

    errorMessage: string;
  }

  interface IIdReadingResponse {
    id: string;

    name: string;

    dob: string;
  }

  interface ILoginResponse {
    token: string;
    refreshToken: string;
  }

  interface IRefreshTokenResponse extends ILoginResponse {}

  interface ITokenData {
    id: number;

    sub: string;

    role: UserRole;
  }

  interface IProfileResponse {
    account: IUser;

    hasSpouse: boolean;
  }
}
