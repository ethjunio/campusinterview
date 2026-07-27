import { axiosInstance } from "@/utils/axios";
import { DeleteCandidateCredentials } from "@/app/types";

export const deleteCandidatesApi = async (
  credentials: DeleteCandidateCredentials
) => {
  const { id } = credentials;

  const response = await axiosInstance.delete(
    `/admin/candidateMgmt/deleteCandidate/${id}`
  );
  return response.data;
};
