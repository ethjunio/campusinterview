import { axiosInstance } from "@/utils/axios";

export const getCompanyGeneralDataApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company"
  );
  return response.data.data;
};
