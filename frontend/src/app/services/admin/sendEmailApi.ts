import { axiosInstance } from "@/utils/axios";

export const sendEmailAPI = async (data: {
  template: string;
  email: string;
  candidateName: string;
  companyName: string;
}) => {
  const response = await axiosInstance.post(`admin/transaction-email`, data);
  return response.data;
};
