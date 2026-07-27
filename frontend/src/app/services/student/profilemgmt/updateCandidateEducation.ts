import { axiosInstance } from "@/utils/axios";

export const updateCandidateEducationAPI = async (
  id: number,
  data: any
): Promise<any> => {
  const response = await axiosInstance.put(
    `/student/profileMgmt/editCandidateEducation/${id}`,
    data
  );
  return response.data;
};
