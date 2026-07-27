import { axiosInstance } from "@/utils/axios";

export const createCompanyWhyJoinUsApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/company/onboarding-why-join-us", data);
  return response.data;  
};
