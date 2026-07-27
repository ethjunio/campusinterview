import { getThingsAboutMeApi } from "@/app/services/student/profilemgmt/getThingsAboutMeApi";
import { useQuery } from "@tanstack/react-query";

export const useGetThingsAboutMeQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getThingsAboutMe"],
    queryFn: () => getThingsAboutMeApi(),
    ...options,
  });
};
