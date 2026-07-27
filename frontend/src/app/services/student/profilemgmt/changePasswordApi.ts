import { axiosInstance } from "@/utils/axios";

// Update the function to accept form data
export const changePasswordApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/profileMgmt/changePassword", data);
  return response.data;  
};
