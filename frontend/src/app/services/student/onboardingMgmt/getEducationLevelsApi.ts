import { axiosInstance } from "@/utils/axios";

export const getEducationLevelsApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/onboardingMgmt/getEducationlevels"
  );
  return response.data;
};
