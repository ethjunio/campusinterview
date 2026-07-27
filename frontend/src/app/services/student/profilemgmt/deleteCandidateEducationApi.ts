import { axiosInstance } from "@/utils/axios";

export const deleteCandidateEducationApi = async (id: string) => {
  const response = await axiosInstance.delete(
    `/student/profileMgmt/deleteCandidateEducation/${id}`
  );
  return response.data;
};
