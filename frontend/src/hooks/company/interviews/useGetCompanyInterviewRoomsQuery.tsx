import { useQuery } from "@tanstack/react-query";
import { getCompanyInterviewRoomsApi } from "@/app/services/company/interviews/getCompanyInterviewRoomsApi";

export const useGetCompanyInterviewRoomsQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getCompanyInterviewRooms"],
      queryFn: () => getCompanyInterviewRoomsApi(),
      ...options,
    });
  };
  