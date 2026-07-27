import { getFaqsStudentBoxDataAPI } from "@/app/services/admin/getFaqsStudentData";
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

export const useGetCandidateBoxQuery = (options: any = {}) => {
  return useQuery<FaqResponse>({
    queryKey: ["getFaqCandidateBox"],
    queryFn: () => getFaqsStudentBoxDataAPI(),
    ...options,
  });
};
