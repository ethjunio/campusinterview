import { axiosInstance } from "@/utils/axios";

export const GetCandidateExtracurricularsApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/profileMgmt/getCandidateExtracuriculars/extracurricular"
  );
  return response.data;
};
