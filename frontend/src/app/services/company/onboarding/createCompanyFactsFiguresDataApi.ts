import { axiosInstance } from "@/utils/axios";

export const createCompanyFactsFiguresDataApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/company/onboarding-facts-and-figures", data);
  return response.data;  
};
