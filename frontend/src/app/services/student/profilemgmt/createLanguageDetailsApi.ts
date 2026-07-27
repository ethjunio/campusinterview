import { axiosInstance } from "@/utils/axios";

// Update the function to accept form data
export const createLanguageDetailsApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/profileMgmt/saveCandidateLanguage/language", data);
  return response.data;  
};
