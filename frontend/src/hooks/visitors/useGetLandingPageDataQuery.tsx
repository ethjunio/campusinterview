import { useQuery } from "@tanstack/react-query";
import { getLandingPageInfoVisitorsApi } from "@/app/services/visitors/getLandingPageInfoApi";

export const useGetLandingPageDataQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getLandingPageInfoVisitors"],
      queryFn: () => getLandingPageInfoVisitorsApi(),
      ...options,
    });
  };
  