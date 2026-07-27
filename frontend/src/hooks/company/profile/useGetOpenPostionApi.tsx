import { useQuery } from "@tanstack/react-query";
import { getOpenPosition } from "@/app/services/company/profile/openPosition";

export const useGetOpenPositionQuery = (options: any = {}) => {
  return useQuery<{
    companyOpen: never[];
    data: any;
  }>({
    queryKey: ["getOpenPosition"],
    queryFn: () => getOpenPosition(),
    ...options,
  });
};
