import { axiosInstance } from "@/utils/axios";

export const getEducationDetailsApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/onboardingMgmt/getCandidateEducationDetails"
  );
  return response.data;
};
