import { axiosInstance } from "@/utils/axios";

// Update the function to accept form data
export const createTimeSlotsApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/interviewMgmt/createTimeSlots", data);
  return response.data;  
};
