import { axiosInstance } from "@/utils/axios";

interface UpdateBoxcredentials{
  siteUIFlag:number,
   
}
export const updateCampusSwitchBoxDataAPI = async (credentials: UpdateBoxcredentials) => {
    
    const payload = {
      siteUIFlag:credentials?.siteUIFlag,
    }
  const response = await axiosInstance.put(
    `/admin/landingPageMgmt/updateUIInterface`,
    payload
  );
  return response.data;
};
