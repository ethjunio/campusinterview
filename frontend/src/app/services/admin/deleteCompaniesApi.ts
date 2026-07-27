import { axiosInstance } from "@/utils/axios";
import { DeleteCompaniesCredentials } from "@/app/types";

export const deleteCompaniesApi = async (
  credentials: DeleteCompaniesCredentials
) => {
  const { id } = credentials;

  const response = await axiosInstance.delete(
    `/admin/companyMgmt/deleteCompany/${id}`
  );
  return response.data;
};
