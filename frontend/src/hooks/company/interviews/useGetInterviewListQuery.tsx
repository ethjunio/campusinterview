import {
  getCompanyAllInterviewRoomsAPI,
  getCompanyTimeSlotsAPI,
} from "@/app/services/company/interviews/getInterviewListApi";
import { Interview } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanyTimeSlotsQuery = (options: any = {}) => {
  return useQuery<{ data: Interview }>({
    queryKey: ["companyTimingSlots"],
    queryFn: () => getCompanyTimeSlotsAPI(),
    ...options,
  });
};

export const useGetCompanyAllInteviewRooms = (options: any = {}) => {
  return useQuery<{ data: Interview }>({
    queryKey: ["companyAllRooms"],
    queryFn: () => getCompanyAllInterviewRoomsAPI(),
    ...options,
  });
};
