import { useQuery } from "@tanstack/react-query";
import { getLanguageDropdownApi } from "@/app/services/student/profilemgmt/getLanguageDropdownApi";

export const useGetLanguageDropdownQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getLanguageDropdown"],
      queryFn: () => getLanguageDropdownApi(),
      ...options,
    });
  };
  