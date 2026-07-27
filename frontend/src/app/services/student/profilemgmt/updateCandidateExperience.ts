import { axiosInstance } from "@/utils/axios";

export const updateCandidateExperienceAPI = async (
  id: number,
  data: any
): Promise<any> => {
  const response = await axiosInstance.put(
    `/student/profileMgmt/editCandidateExperience/${id}`,
    data
  );
  return response.data;
};
