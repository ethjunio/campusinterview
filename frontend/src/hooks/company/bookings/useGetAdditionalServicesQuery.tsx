import { useQuery } from "@tanstack/react-query";
import { getAdditionalServicesApi } from "@/app/services/company/profile/booking";

export const useGetAdditionalServicesQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getAdditionalServices"],
      queryFn: () => getAdditionalServicesApi(),
      ...options,
    });
  };
  