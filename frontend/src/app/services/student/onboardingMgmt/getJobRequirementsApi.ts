import { axiosInstance } from "@/utils/axios";

export const getJobRequirementsApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/onboardingMgmt/getCandidateJobRequirements"
  );
  return response.data;
};
