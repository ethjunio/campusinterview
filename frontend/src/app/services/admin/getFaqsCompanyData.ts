import { DashboardCounts } from "@/app/types";
import { axiosInstance } from "@/utils/axios";

export const getFaqsCompanyBoxDataAPI = async () => {
  const response = await axiosInstance.get(
    "/admin/faqMgmt/getAllFAQ?type=company"
  );
  return response.data;
};
