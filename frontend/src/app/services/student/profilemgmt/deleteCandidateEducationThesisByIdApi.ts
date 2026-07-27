import { axiosInstance } from "@/utils/axios";

export const deleteCandidateEducationThesisByIdApi = async (id: string) => {
  const response = await axiosInstance.delete(
    `/student/profileMgmt/deleteEducationThesis/${id}`
  );
  return response.data;
};
