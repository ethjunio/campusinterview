import { getSkillsLevelDropdownApi } from "@/app/services/student/profilemgmt/getSkillsLevelDropdownApi";
import { useQuery } from "@tanstack/react-query";

export const useGetSkillsLevelsDropdownQuery = () => {
  return useQuery<{ data: any }>({
    queryKey: ["getSkillsLevelDropdown"],
    queryFn: () => getSkillsLevelDropdownApi()
  });
};
