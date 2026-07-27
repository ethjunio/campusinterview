import { axiosInstance } from "@/utils/axios";

export const deleteWithdrawInterviewRequestApi = async (interviewRequestId: any) => {
  const response = await axiosInstance.delete(
    `/student/interviewMgmt/withdrawInterviewRequest`,
    {
      data: { interviewRequestId }, 
    }
  );
  return response.data;
};