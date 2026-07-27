import { axiosInstance } from "@/utils/axios";

export const getPersonalDetailsApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/onboardingMgmt/getPersonalDetails"
  );
  return response.data;
};
