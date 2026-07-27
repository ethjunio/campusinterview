
import { getCampusSwitchBoxDataAPI } from "@/app/services/admin/getCampusSwitchDataApi";
import { useQuery } from "@tanstack/react-query";

export interface SiteUiFlagResponse {
  status: boolean;
  message: string;
  data: {
    siteUiFlag: number | string;
  };
}

export const useGetCampusSwitchBoxQuery = (options: any = {}) => {
  return useQuery<SiteUiFlagResponse>({
    queryKey: ["getCampusSwitchBox"],
    queryFn: () => getCampusSwitchBoxDataAPI(),
    ...options,
  });
};
