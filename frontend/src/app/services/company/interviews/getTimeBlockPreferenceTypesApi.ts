import { axiosInstance } from "@/utils/axios";

export const getTimeBlockPreferenceTypesApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/interviewMgmt/getTimeBlockPreferenceTypes"
  );
  return response.data;
};
