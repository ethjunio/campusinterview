import { DashboardCounts } from "@/app/types";
import { axiosInstance } from "@/utils/axios";

export const getFaqsStudentBoxDataAPI = async () => {
  const response = await axiosInstance.get(
    "/admin/faqMgmt/getAllFAQ?type=candidate"
  );
  return response.data;
};
