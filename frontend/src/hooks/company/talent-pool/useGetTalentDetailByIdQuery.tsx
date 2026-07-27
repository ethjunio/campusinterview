import { getTalentPoolDetailByIdApi } from "@/app/services/company/talent-pool/getTalentPoolDetailByIdApi";
import { useQuery } from "@tanstack/react-query";

export const useGetTalentDetailByIdQuery = (id: any,options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getTalentPoolDetailById",id],
    queryFn: () => getTalentPoolDetailByIdApi(id),
    enabled: !!id,
    ...options,
  });
};
