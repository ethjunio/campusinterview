import { axiosInstance } from "@/utils/axios";

export const getJobDropdownAPI = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/onboardingMgmt/getDesiredJobTypesDropdown"
  );
  return response.data;
};

export const getWorkDropdownAPI = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/onboardingMgmt/getDesiredWorkAreasDropdown"
  );
  return response.data;
};

export const getActivityDropdownAPI = async (): Promise<any> => {
    const response = await axiosInstance.get(
      "/student/onboardingMgmt/getDesiredTravelActivityDropdown"
    );
    return response.data;
  };
  
  export const getInterestDropdownAPI = async (): Promise<any> => {
    const response = await axiosInstance.get(
      "/student/onboardingMgmt/getAreasOfInterestDropdown?search="
    );
    return response.data;
  };
