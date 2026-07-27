import { axiosInstance } from "@/utils/axios";

// Update the function to accept form data
export const updateThesisApi = async (id: any, data: any): Promise<any> => {
  const response = await axiosInstance.put(
    `/student/profileMgmt/updateEducationThesis/${id}`,
    data
  );
  return response.data;
};
