import { UserRole } from "src/util/enums";

export {};

declare global {
  interface IUser {
    id: number;

    email: string;

    username: string;

    phone: string;

    avatar: string;

    hasSpouse: boolean;

    role: UserRole;
  }
}
