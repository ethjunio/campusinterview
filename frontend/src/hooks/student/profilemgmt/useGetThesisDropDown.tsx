import { useGetThesisDropdownApi } from "@/app/services/student/profilemgmt/useGetThesisDropdownApi";
import { useQuery } from "@tanstack/react-query";

export const useGetThesisDropDown = () => {
  return useQuery<{ data: any }>({
    queryKey: ["getThesisDropdown"],
    queryFn: () => useGetThesisDropdownApi(),
  });
};
