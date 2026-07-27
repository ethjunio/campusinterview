import { getFaqsCompanyBoxDataAPI } from "@/app/services/admin/getFaqsCompanyData";
import { getInfoBoxDataAPI } from "@/app/services/admin/getInfoBoxData";
import { InfoBox } from "@/app/types";
import { useQuery } from "@tanstack/react-query";


interface FaqItem {
  id: number;
  question: string;
  answer: string;
  isActive: number; // 1 or 0 (you can also make it boolean if backend changes)
  type: string; // e.g., "company"
  createdAt: string;
  updatedAt: string;
}

export interface FaqResponse {
  status: boolean;
  message: string;
  data: FaqItem[];
}
export const useGetFaqsCompanyBoxQuery = (options: any = {}) => {
  return useQuery<FaqResponse >({
    queryKey: ["getFaqCompanyBox"],
    queryFn: () => getFaqsCompanyBoxDataAPI(),
    ...options,
  });
};
