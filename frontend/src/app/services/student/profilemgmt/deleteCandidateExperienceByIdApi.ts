import { axiosInstance } from "@/utils/axios";

export const deleteCandidateExperienceByIdApi = async (id: string) => {
  const response = await axiosInstance.delete(
    `/student/profileMgmt/deleteCandidateExperience/${id}`
  );
  return response.data;
};
