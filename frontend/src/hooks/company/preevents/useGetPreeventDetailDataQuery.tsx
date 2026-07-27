import { useQuery } from "@tanstack/react-query";
import { getPreEventDetailApi } from "@/app/services/company/preevent/getPreEventDetailApi";

export const useGetPreeventDetailDataQuery = (id: string, options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getPreEventDetail", id],
    queryFn: () => getPreEventDetailApi(id),
    ...options,
  });
};
