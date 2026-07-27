import { getLanguageDropdown } from "@/app/services/company/profile/language";
import { useQuery } from "@tanstack/react-query";

export const useGetLanguageDropdown = (options: any = {}) => {
  return useQuery<{
    map(
      dataToOption: (data: any) => { value: any; label: any } | null
    ): unknown;
    companyOpen: never[];
    data: any;
  }>({
    queryKey: ["getLanguages"],
    queryFn: () => getLanguageDropdown(),
    ...options,
  });
};
