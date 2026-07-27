import { axiosInstance } from "@/utils/axios";

export const getEventDayRecordsAPI = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/admin/eventDayMgmt/getEventDayRecords"
  );
  return response.data;
};
