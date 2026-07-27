import { axiosInstance } from "@/utils/axios";

export const getCountMatchesPerRoomApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/matchMgmt/getMatchCountPerRoom"
  );
  return response.data;
};
