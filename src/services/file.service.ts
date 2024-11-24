import axios from "src/config/axios.chat";
import mainAxios from "src/config/axios.main";

export const postUploadImage = (data: IUploadImageRequest) => {
  return axios.post<unknown, ISecondaryResponse<IFile>>(`files/image`, data);
};

export const postUploadAttachment = (data: IUploadAttachmentRequest) => {
  return axios.post<unknown, ISecondaryResponse<IFile>>(
    `files/attachment`,
    data
  );
};

export const postUploadFile = (fileBase64: string) => {
  return mainAxios.post<unknown, IResponse<IMainFile>>(`files`, {
    fileBase64,
  });
};
