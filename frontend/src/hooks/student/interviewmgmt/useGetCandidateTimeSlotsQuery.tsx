import { useQuery } from "@tanstack/react-query";
import { getCandidateTimeSlotsApi } from "@/app/services/student/interviewMgmt/getCandidateTimeSlotsApi";

export const useGetCandidateTimeSlotsQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getCandidateTimeSlots"],
      queryFn: () => getCandidateTimeSlotsApi(),
      ...options,
    });
  };
  