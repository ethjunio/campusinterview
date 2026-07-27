import { axiosInstance } from "@/utils/axios";

export const getTalentPoolDetailByIdApi = async (id: any): Promise<any> => {
  const response = await axiosInstance.get(
    `/company/talentPoolMgmt/getCandidateDetails/${id}`
  );
  return response.data;
};
