import { useQuery } from "@tanstack/react-query";
import { getPositionDropdownApi } from "@/app/services/student/profilemgmt/getPositionDropdownApi";
export const useGetPositionsDropdownQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getPositionDropdown"],
      queryFn: () => getPositionDropdownApi(),
      ...options,
    });
  };
  