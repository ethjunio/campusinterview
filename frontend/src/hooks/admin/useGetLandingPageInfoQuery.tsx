import { getLandingPageInfoAPI } from "@/app/services/admin/getLandingPageInfoApi";
import { LandingPageInfo } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useGetLandingPageInfoQuery = (options: any = {}) => {
  return useQuery<{ data: LandingPageInfo }>({
    queryKey: ["landingPageInfo"],
    queryFn: () => getLandingPageInfoAPI(),
    ...options,
  });
};
