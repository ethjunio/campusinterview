import { axiosInstance } from "@/utils/axios";

export const getCanSendInterviewRequestApi = async (id: any): Promise<any> => {
  const response = await axiosInstance.get(
    `/company/interviewMgmt/canSendRequest/${id}`
  );
  return response.data;
};
