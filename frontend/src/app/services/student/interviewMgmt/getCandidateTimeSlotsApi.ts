import { axiosInstance } from "@/utils/axios";

export const getCandidateTimeSlotsApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/interviewMgmt/getCandidateTimeSlots"
  );
  return response.data;
};
