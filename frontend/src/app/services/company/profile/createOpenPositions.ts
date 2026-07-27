import { axiosInstance } from "@/utils/axios";

export const createOpenPositions = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/company/onboarding-open-positions", data);
  return response.data;  
};
