import { getSettingsApi } from "@/app/services/student/profilemgmt/getSettingsApi";
import { useQuery } from "@tanstack/react-query";

export const useGetSettingsQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getSettingsApi"],
    queryFn: () => getSettingsApi(),
    ...options,
  });
};
