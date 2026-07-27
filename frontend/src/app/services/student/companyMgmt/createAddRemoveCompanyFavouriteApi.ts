import { axiosInstance } from "@/utils/axios";

export const createAddRemoveCompanyFavouriteApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/companyMgmt/addRemoveCompTofav", data);
  return response.data;  
};
