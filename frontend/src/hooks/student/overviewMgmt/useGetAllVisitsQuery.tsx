import { getAllVisitsApi } from "@/app/services/student/overViewMgmt/getAllVisitsApi";
import { useQuery } from "@tanstack/react-query";

export const useGetAllVisitsQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getAllVisitsApi"],
    queryFn: () => getAllVisitsApi(),
    ...options,
  });
};
