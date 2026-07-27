import { axiosInstance } from "@/utils/axios";

// Update the function to accept form data
export const createextracurriculardetailsApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/profileMgmt/saveCandidateExtracuricular/extracurricular", data);
  return response.data;  
};
