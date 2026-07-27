import { axiosInstance } from "@/utils/axios";

export const getCompanyInterviewRoomsApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/interviewMgmt/getCompanyInterviewRooms"
  );
  return response.data;
};
