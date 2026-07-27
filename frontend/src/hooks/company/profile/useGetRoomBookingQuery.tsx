import { getRoomBookingTypeApi } from "@/app/services/company/profile/booking";
import { useQuery } from "@tanstack/react-query";

export const useGetRoomBookingQuery = (options: any = {}) => {
  return useQuery<{
    companyOpen: never[];
    data: any;
  }>({
    queryKey: ["getRoomBookingType"],
    queryFn: () => getRoomBookingTypeApi(),
    ...options,
  });
};
