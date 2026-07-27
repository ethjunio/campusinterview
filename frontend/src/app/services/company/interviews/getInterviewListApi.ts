import { axiosInstance } from "@/utils/axios";

export const getCompanyTimeSlotsAPI = async () => {
  const response = await axiosInstance.get("/company/interviews/getTimeSlots");
  return response.data;
};

export const getCompanyAllInterviewRoomsAPI = async () => {
  const response = await axiosInstance.get(
    "/company/interviewMgmt/getInterviewRoomsAll",
  );
  return response.data;
};
