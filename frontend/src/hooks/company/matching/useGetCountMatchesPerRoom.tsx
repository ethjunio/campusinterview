import { useQuery } from "@tanstack/react-query";
import { getCompanyArrangedInterviewApi } from "@/app/services/company/matching/getCompanyArrangedInterviewApi";
import { getCountMatchesPerRoomApi } from "@/app/services/company/matching/getCountMatchesPerRoomApi";

export const useGetCountMatchesPerRoomQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getCountMatchesPerRoom"],
      queryFn: () => getCountMatchesPerRoomApi(),
      ...options,
    });
  };
  