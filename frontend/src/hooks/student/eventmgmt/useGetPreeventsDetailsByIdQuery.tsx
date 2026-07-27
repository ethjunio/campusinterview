import { getPreeventsDetailsApi } from "@/app/services/student/eventMgmt/getPreeventsDetailsApi";
import { useQuery } from "@tanstack/react-query";

export const useGetPreeventsDetailsByIdQuery = (id: number,options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getPreeventsDetailsApi",id],
    queryFn: () => getPreeventsDetailsApi(id),
    enabled: !!id,
    ...options,
  });
};
