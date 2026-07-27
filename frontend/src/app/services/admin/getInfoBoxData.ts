import { DashboardCounts } from "@/app/types";
import { axiosInstance } from "@/utils/axios";

export const getInfoBoxDataAPI = async () => {
  const response = await axiosInstance.get(
    "/admin/informationBoard/getInformationBoardData"
  );
  return response.data;
};
