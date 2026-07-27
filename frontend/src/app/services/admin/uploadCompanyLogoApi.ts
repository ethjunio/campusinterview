import { axiosInstanceFormData } from "@/utils/axios";

export const uploadCompanyLogoAPI = async (payload: {
  type: string;
  credentials: any;
}) => {
  const response = await axiosInstanceFormData.post(
    `/admin/logoMgmt/uploadLogo/${payload.type}`,
    payload.credentials
  );
  return response.data;
};
