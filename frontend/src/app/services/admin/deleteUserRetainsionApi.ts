import { axiosInstance } from "@/utils/axios";

export const deleteUserRetainsionApi = async () => {
  const response = await axiosInstance.delete(
    `/admin/userRetentionMgmt/deleteUnsavedData`
  );
  return response.data;
};
