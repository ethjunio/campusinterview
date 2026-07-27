import { axiosInstance } from "@/utils/axios";

export const getCompanyLogosAPI = async (type: string): Promise<any> => {
  const response = await axiosInstance.get(
    `/admin/logoMgmt/getCompanyLogos/${type}`
  );
  return response.data;
};
