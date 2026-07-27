import { axiosInstance } from "@/utils/axios";

export const getParticipantListApi = async (sortName:string, size:number, id:string,page:number,search:string): Promise<any> => {
    const params = new URLSearchParams({
     page:page.toString(),
      limit: size.toString(),
      search:search?search:""
    //   sort_name: sortName
    });
  
    const response = await axiosInstance.get(
      `/admin/bookingMgmt/getCompanyParticipants/${id}?${params.toString()}`
    );
    return response.data;
  };