import { useQuery } from "@tanstack/react-query";
import { getTimeSlotPreferenceTypesApi } from "@/app/services/student/interviewMgmt/getTimeSlotPreferenceTypesApi";

export const useGetTimeSlotPreferenceTypesQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getTimeSlotPreferenceTypes"],
      queryFn: () => getTimeSlotPreferenceTypesApi(),
      ...options,
    });
  };
  