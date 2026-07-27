import { getEventsListByIdApi } from "@/app/services/admin/eventPreevents/getEventsListByIdApi";
import { useQuery } from "@tanstack/react-query";

export const useGetEventsByIdQuery = (id: string,options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["eventsListById",id],
    queryFn: () => getEventsListByIdApi(id),
    enabled: !!id,
    ...options,
  });
};
