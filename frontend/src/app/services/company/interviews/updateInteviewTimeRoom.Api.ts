import { axiosInstance } from "@/utils/axios";

export const updateInterviewTimeRoomSlot = async (data: {
  id: string;
  payload: {
    timeSlotId: number;
    interviewRoomId: number;
  };
}) => {
  const response = await axiosInstance.put(
    `/company/interviewMgmt/updateTimeRoom/${data.id}`,
    data.payload,
  );
  return response.data;
};
