import { useQuery } from "@tanstack/react-query";
import { getPreeventsListApi } from "@/app/services/student/eventMgmt/getPreeventsListApi";

export const useGetPreeventsListQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getPreeventsList"],
      queryFn: () => getPreeventsListApi(),
      ...options,
    });
  };
  