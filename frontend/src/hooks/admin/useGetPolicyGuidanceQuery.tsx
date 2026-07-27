
import { getPolicyGuidanceBoxDataAPI } from "@/app/services/admin/getPolicyGuidanceDataApi";
import { useQuery } from "@tanstack/react-query";

interface FaqItem {
    id: number;
    question: string;
    answer: string;
    isActive: number; // 1 or 0 (you can also make it boolean if backend changes)
    type: string; // e.g., "company"
    createdAt: string;
    updatedAt: string;
    siteUiFlag:string|number
  }
  
  export interface FaqResponse {
    status: boolean;
    message: string;
    data: FaqItem;
  }

export const useGetPolicyGuidanceBoxQuery = (options: any = {}) => {
  return useQuery<FaqResponse>({
    queryKey: ["getPolicyGuidanceBox"],
    queryFn: () => getPolicyGuidanceBoxDataAPI(),
    ...options,
  });
};
