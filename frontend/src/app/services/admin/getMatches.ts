import { axiosInstance } from "@/utils/axios";

export const getMatchDropdownCompanyAPI = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/admin/matchesMgmt/getMatchesNamesDropdown/company"
  );
  return response.data;
};

export const getMatchDropdownUserAPI = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/admin/matchesMgmt/getMatchesNamesDropdown/candidate"
  );
  return response.data;
};

export const getMatchesListAPI = async (
  companyId?: string | null,
  candidateId?: string | null
) => {
  let query = "";

  if (companyId) {
    query += `?companyId=${encodeURIComponent(companyId)}`;
  }

  if (candidateId) {
    query += query
      ? `&candidateId=${encodeURIComponent(candidateId)}`
      : `?candidateId=${encodeURIComponent(candidateId)}`;
  }

  const response = await axiosInstance.get(
    `/admin/matchesMgmt/getMatchesList${query}`
  );
  return response.data;
};

export const getExportMatchDataAPI = async () => {
  const response = await axiosInstance.get(
    `/admin/matchesMgmt/getCandidatesWithMatchExport`
  );
  return response.data;
};
