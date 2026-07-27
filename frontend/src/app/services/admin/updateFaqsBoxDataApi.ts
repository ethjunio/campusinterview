import { axiosInstance } from "@/utils/axios";

interface UpdateBoxcredentials{
    id:number,
  question:string,
  answer:string
   
}
export const updateFaqsBoxDataAPI = async (credentials: UpdateBoxcredentials) => {
    
    const payload = {
      question:credentials?.question,
      answer:credentials?.answer,

    }
  const response = await axiosInstance.put(
    `admin/faqMgmt/updateFAQ/${credentials?.id}`,
    payload
  );
  return response.data;
};
