import { useQuery } from "@tanstack/react-query";
import { getEducationListApi } from "@/app/services/student/profilemgmt/getEducationListApi";

export const useGetEducationListQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getEducationListApi"],
    queryFn: () => getEducationListApi(),
    ...options,
  });
};
