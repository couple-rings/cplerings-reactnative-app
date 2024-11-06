export {};

declare global {
  interface ILoginRequest {
    email: string;
    password: string;
  }

  interface IRefreshTokenRequest {
    refreshToken: string;
  }

  interface ISendOtpRequest {
    email: string;
  }

  interface IResetPasswordRequest {
    email: string;
    newPassword: string;
    otp: string;
  }

  interface IConversationFilter {
    userId: number;
  }

  interface IUpdateConversationRequest {
    userId: number;
  }

  interface IUpdateMessageRequest {
    read: boolean;
  }

  interface IMessageFilter {
    conversationId: string;

    current?: number;
  }

  interface IUploadImageRequest {
    folderName: string;

    type: FileType;

    base64Image: {
      data: string;

      size: number;

      name: string;

      mimetype: string;
    };
  }

  interface IUploadAttachmentRequest {
    folderName: string;

    type: FileType;

    base64Attachment: {
      data: string;

      size: number;

      name: string;

      mimetype: string;
    };
  }
}
