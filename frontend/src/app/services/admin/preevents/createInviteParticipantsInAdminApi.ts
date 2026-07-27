import { axiosInstance } from "@/utils/axios";

export const createInviteParticipantsInAdminApi = async (
  data: any,
): Promise<any> => {
  const response = await axiosInstance.post(
    "/admin/company-preevent/inviteParticipants",
    data,
  );
  return response.data;
};
