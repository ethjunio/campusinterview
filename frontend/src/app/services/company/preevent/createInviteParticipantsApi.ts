import { axiosInstance } from "@/utils/axios";

export const createInviteParticipantsApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/company/eventMgmt/inviteParticipants", data);
  return response.data;  
};
