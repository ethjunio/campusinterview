import { axiosInstance } from "@/utils/axios";

export const createApproveCompany = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/admin/companyMgmt/approveCompany", data);
  return response.data;  
};
