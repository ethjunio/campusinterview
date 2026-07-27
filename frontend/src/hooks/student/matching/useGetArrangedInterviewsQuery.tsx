import { useQuery } from "@tanstack/react-query";
import { getArrangedInterviewsApi } from "@/app/services/student/matching/getArrangedInterviewsApi";

export const useGetArrangedInterviewsQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getArrangedInterviews"],
      queryFn: () => getArrangedInterviewsApi(),
      ...options,
    });
  };
  