import { useQuery } from "@tanstack/react-query";
import { getTimeSlotAPi } from "@/app/services/student/interviewMgmt/getTimeSlotAPi";

export const useGetTimeSlotsQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getTimeSlot"],
      queryFn: () => getTimeSlotAPi(),
      ...options,
    });
  };
  