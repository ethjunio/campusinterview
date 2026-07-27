
import { updatePolicyGuidanceBoxDataAPI } from "@/app/services/admin/updatePolicyGuidanceDataApi";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePolicyGuidanceDataMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["updatePolicyGuidanceDataMutation"],
    mutationFn: updatePolicyGuidanceBoxDataAPI,
    ...options,
  });

  return mutation;
};
