
import { getParticipantListApi } from "@/app/services/admin/bookings/getParticipantListAPI";
  import { useQuery } from "@tanstack/react-query";
  
  export const useGetBookingParticipantsList = (sortName: string, id: string,size:number,page:number, search: string,) => {
    return useQuery<{ data: any, totalCount: number }>({
      queryKey: ["getParticipantListApi", id,sortName,size,page,search],
      queryFn: () => getParticipantListApi(sortName,size,id,page,search),
      
    });
  };
 
  