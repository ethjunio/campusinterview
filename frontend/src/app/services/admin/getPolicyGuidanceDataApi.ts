import { DashboardCounts } from "@/app/types";
import { axiosInstance } from "@/utils/axios";

export const getPolicyGuidanceBoxDataAPI = async () => {
  const response = await axiosInstance.get(
    `/capital_final/test/legal-docs/terms-and-conditions.pdf?v=${Date.now()}`
  );
  return response.data;
};
