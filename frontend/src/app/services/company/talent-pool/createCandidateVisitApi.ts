import { axiosInstance } from "@/utils/axios";

export const createCandidateVisitApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/company/talentPoolMgmt/createVisit", data);
  return response.data;  
};
