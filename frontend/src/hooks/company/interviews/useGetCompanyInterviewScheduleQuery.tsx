import { useQuery } from "@tanstack/react-query";
import { CompanyInterviewScheduleResponse, getCompanyInterviewSchedule, getCompanyInterviewScheduleRoom } from "@/app/services/company/interviews/getCompanyInterviewSchedule";


export const useGetCompanyInterviewScheduleQuery = (options: any = {},page:any,debouncedInput:any) => {
    return useQuery<{ data: any }>({
      queryKey: ["getCompanyInterviewSchedule",page,debouncedInput],
      queryFn: () => getCompanyInterviewSchedule(page,debouncedInput),
      ...options,
    });
  };
  export const useGetCompanyInterviewScheduleRoomQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getCompanyInterviewScheduleRoom"],
      queryFn: () => getCompanyInterviewScheduleRoom(),
      ...options,
    });
  };
  