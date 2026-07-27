import { axiosInstance } from "@/utils/axios";

interface DeleteAllMatchParams {
    searchCandidateTerm: string|null;
    searchCompanyTerm: string|null;
  }
export const deleteAllMatchItemApi = async ({
    searchCandidateTerm,
    searchCompanyTerm,
  }: DeleteAllMatchParams) => {
    const params = new URLSearchParams();

if (searchCandidateTerm) {
  params.append("candidateId", searchCandidateTerm);
}

if (searchCompanyTerm) {
  params.append("companyId", searchCompanyTerm);
}

  const response = await axiosInstance.delete(
    `/admin/matchesMgmt/deleteMatches??${params.toString()}`
  );
  return response.data;
};
// 