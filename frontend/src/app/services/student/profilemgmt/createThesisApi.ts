import { axiosInstance } from "@/utils/axios";

// Update the function to accept form data
export const createThesisApi = async (data: any): Promise<any> => {
  const response = await axiosInstance.post(
    "/student/profileMgmt/addEducationThesis",
    data
  );
  return response.data;
};
