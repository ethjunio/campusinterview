import { axiosInstance } from "@/utils/axios";

export const getLandingPageInfoAPI = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/admin/landingPageMgmt/getLandingPageInfo"
  );
  return response.data;
};
