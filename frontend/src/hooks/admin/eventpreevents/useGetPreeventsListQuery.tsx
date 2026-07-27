import { getPreeventsListApi } from "@/app/services/admin/eventPreevents/getPreeventsListApi";
// import { EventPreeventsList } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useGetPreeventsListQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["preeventsList"],
    queryFn: () => getPreeventsListApi(),
    ...options,
  });
};
