import { createThesisApi } from "@/app/services/student/profilemgmt/createThesisApi";

import { useMutation } from "@tanstack/react-query";

export const useCreateThesisMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createThesisApi"],
    mutationFn: createThesisApi,
    ...options,
  });

  return mutation;
};
