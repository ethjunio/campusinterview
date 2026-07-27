import { axiosInstance } from "@/utils/axios";

interface AddBoxcredentials{
    question:string,
    answer:string,
    type:string
}
export const addFaqsBoxDataAPI = async (credentials: AddBoxcredentials) => {
  const response = await axiosInstance.post(
    "/admin/faqMgmt/addFAQ",
    credentials
  );
  return response.data;
};
