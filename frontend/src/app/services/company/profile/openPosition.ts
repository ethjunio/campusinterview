import { axiosInstance } from "@/utils/axios";

export const createOpenPosition = async (data: any): Promise<any> => {
  const response = await axiosInstance.post(
    "/company/onboarding-open-positions",
    data
  );
  return response.data;
};

export const getOpenPosition = async (): Promise<any> => {
  const response = await axiosInstance.get("/company");
  return response.data.data;
};
