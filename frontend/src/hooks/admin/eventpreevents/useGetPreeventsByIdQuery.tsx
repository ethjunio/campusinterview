import { getPreeventsListByIdApi } from "@/app/services/admin/eventPreevents/getPreeventsListByIdApi";
import { useQuery } from "@tanstack/react-query";

export const useGetPreeventsByIdQuery = (id: string,options: any = {}) => {
  console.log("function caleed")
  return useQuery<{ data: any }>({
    queryKey: ["preeventsListById",id],
    queryFn: () => getPreeventsListByIdApi(id),
    enabled: !!id,
    ...options,
  });
};
