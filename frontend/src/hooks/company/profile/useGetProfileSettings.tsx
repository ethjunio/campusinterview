import { useQuery } from "@tanstack/react-query";
import { getSettingApi } from "@/app/services/company/profile/setting";

export const useGetProfileSettingsQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getProfileSettings"],
    queryFn: () => getSettingApi(),
    ...options,
  });
};
