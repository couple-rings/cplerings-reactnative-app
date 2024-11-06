import axios from "src/config/axios.chat";

export const postUploadImage = (data: IUploadImageRequest) => {
  return axios.post<unknown, ISecondaryResponse<IFile>>(`files/image`, data);
};

export const postUploadAttachment = (data: IUploadAttachmentRequest) => {
  return axios.post<unknown, ISecondaryResponse<IFile>>(
    `files/attachment`,
    data
  );
};
