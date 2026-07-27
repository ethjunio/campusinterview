import { axiosInstance } from "@/utils/axios";

export const deleteMatchItemApi = async (id: string) => {
  const response = await axiosInstance.delete(
    `/admin/matchesMgmt/deleteMatch/${id}`
  );
  return response.data;
};
