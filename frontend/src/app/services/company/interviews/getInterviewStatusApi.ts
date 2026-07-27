import { axiosInstance } from "@/utils/axios";

export const getInterviewStatusApi = async (
  candidateId: string | number,
  companyId: string | number
): Promise<any> => {
  const response = await axiosInstance.get(
    `/common/getInterviewStatus?candidateId=${candidateId}&companyId=${companyId}`
  );
  return response.data;
};