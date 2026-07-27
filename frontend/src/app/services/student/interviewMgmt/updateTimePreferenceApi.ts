import { axiosInstance } from "@/utils/axios";

export const updateTimePreferenceApi = async (data: any): Promise<any> => {

    console.log("data coming here", data)
    const {slotId} = data
    const {timeSlotPreferenceTypeId} =data
  const response = await axiosInstance.put(
    `/student/interviewMgmt/updateTimePreference/${slotId}`,{timeSlotPreferenceTypeId:timeSlotPreferenceTypeId}
  );
  return response.data;
};
