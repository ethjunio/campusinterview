import { createEducationList } from "@/app/services/student/profilemgmt/createEducationList";
import { useMutation } from "@tanstack/react-query";

export const useAddEducationDetails = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["addEducation"],
    mutationFn: createEducationList,
    ...options,
  });

  return mutation;
};
