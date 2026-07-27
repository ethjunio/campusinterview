import { StatusUpdate } from "@/app/types";
import { axiosInstance } from "@/utils/axios";

export const updateStatusCompanyAPI = async (credentials: StatusUpdate) => {
  const response = await axiosInstance.post(
    "/admin/companyMgmt/updateStatus",
    credentials
  );
  return response.data;
};
