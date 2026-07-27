import { DashboardCounts } from "@/app/types";
import { axiosInstance } from "@/utils/axios";

export const getCampusSwitchBoxDataAPI = async () => {
  const response = await axiosInstance.get(
    "/admin/landingPageMgmt/getUIInterfaceFlag"
  );
  return response.data;
};
