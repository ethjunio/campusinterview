import { axiosInstance } from "@/utils/axios";

export const getEducationListApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/profileMgmt/getCandidateEducationDetails"
  );
  return response.data;
};
