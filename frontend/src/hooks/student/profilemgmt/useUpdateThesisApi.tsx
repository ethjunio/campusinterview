import { updateThesisApi } from "@/app/services/student/profilemgmt/updateThesisApi";
import { useMutation } from "@tanstack/react-query";

export const useUpdateThesisMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["updateThesisApi"],
    mutationFn: async (variables: { id: number; data: any }) => {
      return updateThesisApi(variables.id, variables.data);
    },
    ...options,
  });

  return mutation;
};
