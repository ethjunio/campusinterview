import { axiosInstance } from "@/utils/axios";

export const getNationalityDropdownAPI = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/onboardingMgmt/getNationalitiesDropdown"
  );
  return response.data;
};

export const getResidentialDropdownAPI = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/onboardingMgmt/getResidencePermitsDropdown"
  );
  return response.data;
};
