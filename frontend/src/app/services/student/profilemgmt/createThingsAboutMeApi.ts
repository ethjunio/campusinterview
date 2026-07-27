import { axiosInstance } from "@/utils/axios";

// Update the function to accept form data
export const creatThingsAboutdetailsApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/profileMgmt/saveCandidateInfo/info", data);
  return response.data;  
};
