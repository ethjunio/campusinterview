import { axiosInstance } from "@/utils/axios";

// Update the function to accept form data
export const createEducationList = async (data: any): Promise<any> => {
  const response = await axiosInstance.post(
    "/student/profileMgmt/addCandidateEducation",
    data
  );
  return response.data;
};
