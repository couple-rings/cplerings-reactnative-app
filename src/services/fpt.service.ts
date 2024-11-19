import axios from "src/config/axios.fpt";

export const postIdReading = (file: IFileRequest) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const payload = new FormData();

  payload.append("image", file as unknown as File);

  return axios.post<unknown, IFptResponse<IIdReadingResponse[]>>(
    `vision/idr/vnm`,
    payload,
    config
  );
};
