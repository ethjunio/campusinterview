import { axiosInstance } from "@/utils/axios";

// Update the function to accept form data
export const createsettingsApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/profileMgmt/saveCandidaateSettings", data);
  return response.data;  
};
