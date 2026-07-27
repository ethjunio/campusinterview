import { axiosInstance } from "@/utils/axios";

export const getTimeSlotAPi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/interviewMgmt/getTimeSlots"
  );
  return response.data;
};
