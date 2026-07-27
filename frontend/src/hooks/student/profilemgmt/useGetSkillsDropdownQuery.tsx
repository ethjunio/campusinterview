import { getSkillsDropdownApi } from "@/app/services/student/profilemgmt/getSkillsDropdownApi";
import { useQuery } from "@tanstack/react-query";

export const useGetSkillsDropdownQuery = () => {
  return useQuery({
    queryKey: ["getSkillsDropdown"],
    queryFn: getSkillsDropdownApi,
  });
};