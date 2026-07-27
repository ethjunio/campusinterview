import { axiosInstance } from "@/utils/axios";

export const getInterviewListApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/interviewMgmt/getInterviewList"
  );
  return response.data;
};
