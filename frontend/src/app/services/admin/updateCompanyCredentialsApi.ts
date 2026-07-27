import { axiosInstance } from "@/utils/axios";

export const updateCompanyCredentialsAPI = async (data: {
  contactId: string;
  credentials: {
    firstName: string;
    lastName: string;
    email: string;
    accountEmail:string;
  };
}) => {
  const response = await axiosInstance.put(
    `/admin/companyCredMgmt/updateCompanyCredentials/${data.contactId}`,
    data.credentials
  );
  return response.data;
};
