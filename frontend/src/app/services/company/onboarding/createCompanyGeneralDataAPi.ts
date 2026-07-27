import { axiosInstance } from "@/utils/axios";

export const createCompanyGeneralDataAPi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/company/onboarding-general-data", data);
  return response.data;  
};
