import { useQuery } from "@tanstack/react-query";
import { getInterviewListApi } from "@/app/services/student/interviewMgmt/getInterviewListApi";

export const useGetCandidateInterviewListQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getInterviewList"],
      queryFn: () => getInterviewListApi(),
      ...options,
    });
  };
  