import { axiosInstance } from "@/utils/axios";

export const createCompanyContactDataApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/company/onboarding-contacts", data);
  return response.data;  
};
