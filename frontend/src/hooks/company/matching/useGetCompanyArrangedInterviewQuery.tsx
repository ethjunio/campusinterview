import { useQuery } from "@tanstack/react-query";
import { getCompanyArrangedInterviewApi } from "@/app/services/company/matching/getCompanyArrangedInterviewApi";

export const useGetCompanyArrangedInterviewQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getCompanyArrangedInterview"],
      queryFn: () => getCompanyArrangedInterviewApi(),
      ...options,
    });
  };
  