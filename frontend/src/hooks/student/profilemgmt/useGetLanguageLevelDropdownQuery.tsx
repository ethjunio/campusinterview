import { useQuery } from "@tanstack/react-query";
import { getLanguageLevelDropdownApi } from "@/app/services/student/profilemgmt/getLanguageLevelDropdownApi";

export const useGetLanguageLevelDropdownQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getLanguageLevelDropdown"],
      queryFn: () => getLanguageLevelDropdownApi(),
      ...options,
    });
  };
  