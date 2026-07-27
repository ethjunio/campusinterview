import { useQuery } from "@tanstack/react-query";
import { getInterviewStatusApi } from "@/app/services/company/interviews/getInterviewStatusApi";

export const useGetInterviewStatusQuery = (
  candidateId: string | number,
  companyId: string | number,
  options: any = {}
) => {
  return useQuery<{ data: any }>({
    queryKey: ["getInterviewStatus", candidateId, companyId],
    queryFn: () => getInterviewStatusApi(candidateId, companyId),
    ...options,
  });
};