import { axiosInstance } from "@/utils/axios";

export const deleteCompanyLogoApi = async (imageUrl: string) => {
  const response = await axiosInstance.delete(
    `/admin/logoMgmt/deleteLogo?imageUrl=${imageUrl}`
  );
  return response.data;
};
