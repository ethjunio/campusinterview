import { DashboardCounts } from "@/app/types";
import { axiosInstance } from "@/utils/axios";

export const getDashboardCountsAPI = async (): Promise<DashboardCounts> => {
  const response = await axiosInstance.get(
    "/admin/dashboard/getDashboardCounts"
  );
  return response.data;
};
