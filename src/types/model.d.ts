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

  interface IFile {
    _id: string;

    url: string;

    key: string;

    size?: number;

    originalName: string;
  }

  interface IMessage {
    _id?: string;

    sender: number;

    content: string;

    conversationId: string;

    sentAt: string;

    imageId?: IFile;

    attachmentId?: IFile;

    read?: boolean;
  }

  interface IConversation {
    _id: string;

    participants: number[];

    latestMessage?: IMessage;

    notifiedUsers?: number[];
  }
}
