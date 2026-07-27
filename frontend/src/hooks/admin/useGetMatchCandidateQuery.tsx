import {
  getExportMatchDataAPI,
  getMatchDropdownCompanyAPI,
  getMatchDropdownUserAPI,
  getMatchesListAPI,
} from "@/app/services/admin/getMatches";
import { deleteMatchItemApi } from "@/app/services/admin/deleteMatchItemApi";
import { UseMutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { deleteAllMatchItemApi } from "@/app/services/admin/deleteAllMatchItemApi";

export const useGetMatchCompanyQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["matchCompanyDropdown"],
    queryFn: () => getMatchDropdownCompanyAPI(),
    ...options,
  });
};

export const useGetMatchUserQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["matchUserDropdown"],
    queryFn: () => getMatchDropdownUserAPI(),
    ...options,
  });
};

export const useGetMatchesListQuery = (
  options: any = {},
  candidateName: string | null,
  companyName: string | null
) => {
  return useQuery<{ data: any }>({
    queryKey: ["matchesList", companyName, candidateName],
    queryFn: () => getMatchesListAPI(companyName, candidateName),
    ...options,
  });
};

export const useDeleteMatchItemMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["deleteMatchItem"],
    mutationFn: deleteMatchItemApi,
    ...options,
  });

  return mutation;
};
interface DeleteAllMatchParams {
  searchCandidateTerm: string|null;
  searchCompanyTerm: string|null;
}
export const useDeleteAllMatchMutation = (
  options?: UseMutationOptions<any, unknown, DeleteAllMatchParams>
) => {
  return useMutation<any, unknown, DeleteAllMatchParams>({
    mutationKey: ["useDeleteAllMatch"],
    mutationFn: deleteAllMatchItemApi,
    ...options,
  });
};
export const useGetMatchCandidateDataQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["matchCandidateData"],
    queryFn: () => getExportMatchDataAPI(),
    ...options,
  });
};
