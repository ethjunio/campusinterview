import { getCanSendInterviewRequestApi } from "@/app/services/company/talent-pool/getCanSendInterviewRequestApi";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanyCanSendRequestQuery = (id: any,options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getCanSendInterviewRequest",(id)],
    queryFn: () => getCanSendInterviewRequestApi(id),
    enabled: !!id,
    retry:false,
    ...options,
  });
};
