import { axiosInstance } from "@/utils/axios";

export const getLandingPageInfoVisitorsApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/visitor/getlandingPageData"
  );
  return response.data;
};
