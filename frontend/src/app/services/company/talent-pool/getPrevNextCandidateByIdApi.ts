import { axiosInstance } from "@/utils/axios";
import qs from "qs"; // for handling nested query params

export const getPrevNextCandidateByIdApi = async (id: any, queryParams: Record<string, string> = {}): Promise<any> => {
  const queryString = qs.stringify(queryParams, { addQueryPrefix: true });
  const response = await axiosInstance.get(
    `/company/talentPoolMgmt/getNextPrevCandi/${id}${queryString}`
  );
  return response.data;
};