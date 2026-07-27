import { axiosInstance } from "@/utils/axios";

export const getPreeventsListApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/eventMgmt/getPreevents/separate"
  );
  return response.data;
};
