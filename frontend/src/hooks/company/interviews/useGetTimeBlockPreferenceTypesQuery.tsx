import { useQuery } from "@tanstack/react-query";
import { getTimeBlockPreferenceTypesApi } from "@/app/services/company/interviews/getTimeBlockPreferenceTypesApi";

export const useGetTimeBlockPreferenceTypesQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getTimeBlockPreferenceTypes"],
      queryFn: () => getTimeBlockPreferenceTypesApi(),
      ...options,
    });
  };
  