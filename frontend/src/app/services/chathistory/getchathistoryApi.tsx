import { axiosInstance } from "@/utils/axios";

export const getchathistoryApi = async ({
  senderId,
  receiverId,
  page = 0,
}: {
  senderId: string;
  receiverId: string;
  page?: number;
}): Promise<any> => {
  const response = await axiosInstance.get(
    `/common/getChatConversation?senderId=${senderId}&receiverId=${receiverId}&page=${page}`
  );
  return response.data;
};