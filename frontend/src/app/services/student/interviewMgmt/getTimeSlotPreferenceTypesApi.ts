import { axiosInstance } from "@/utils/axios";

export const getTimeSlotPreferenceTypesApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/interviewMgmt/getTimeSlotPreferenceTypes"
  );
  return response.data;
};
