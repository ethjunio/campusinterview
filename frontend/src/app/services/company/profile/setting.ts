import { axiosInstance } from "@/utils/axios";

export const saveSettingsApi = async (data: any): Promise<any> => {
  const response = await axiosInstance.post(
    "/company/profileMgmt/saveCompanySettings",
    data
  );
  return response.data;
};

export const getSettingApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/profileMgmt/getCompanySettings"
  );
  return response.data;
};
