import { useQuery } from "@tanstack/react-query";
import { getCanSendRequestApi } from "@/app/services/student/companyMgmt/getCanSendRequestApi";

export const useGetCanSendRequestQuery = (id:any, options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getCanSendRequest", id],
      queryFn: () => getCanSendRequestApi(id),
      ...options,
    });
  };
  