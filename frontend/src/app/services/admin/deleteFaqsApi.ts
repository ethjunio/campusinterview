import { axiosInstance } from "@/utils/axios";
import { DeleteCandidateCredentials } from "@/app/types";

export const deleteFaqsApi = async (
  credentials: DeleteCandidateCredentials
) => {
  const { id } = credentials;

  const response = await axiosInstance.delete(
    `/admin/faqMgmt/deleteFAQ/${id}`
  );
  return response.data;
};
