import { createItSkillsDetailsApi } from "@/app/services/student/profilemgmt/createItSkillsDetailsApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateItSkillsDetailsMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createItSkillsDetails"],
    mutationFn: createItSkillsDetailsApi,
    ...options,
  });

  return mutation;
};
