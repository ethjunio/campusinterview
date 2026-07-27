import { axiosInstance } from "@/utils/axios";

export const getUniversityDropdownAPI = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/onboardingMgmt/getUniversityDropdown"
  );
  return response.data;
};

export const getMajorsDropdownAPI = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/onboardingMgmt/getMajorsDropdown?search="
  );
  return response.data;
};

export const getSpecializationDropdownAPI = async (): Promise<any> => {
    const response = await axiosInstance.get(
      "/student/onboardingMgmt/getSpecializationDropdown"
    );
    return response.data;
  };
  
