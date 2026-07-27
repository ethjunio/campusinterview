import { InfoBoxCredentials } from "@/app/types";
import { axiosInstance } from "@/utils/axios";

export const updateInfoBoxDataAPI = async (credentials: InfoBoxCredentials) => {
  const response = await axiosInstance.put(
    "/admin/informationBoard/updateInformationBoardData",
    credentials
  );
  return response.data;
};
