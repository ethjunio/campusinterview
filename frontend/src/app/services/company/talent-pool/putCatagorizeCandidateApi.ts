import { axiosInstance } from "@/utils/axios";

export const putCatagorizeCandidateApi = async (id: string | number, data: any): Promise<any> => {
  console.log("data in API:", data);
  const response = await axiosInstance.put(
    `/company/talentPoolMgmt/categorizeCandidate/${id}`, 
    data
  );
  return response.data;
};
