import { createParticipateInEventApi } from "@/app/services/student/eventMgmt/createParticipateInEventApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateParticipateInEventMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createParticipateInEvent"],
    mutationFn: createParticipateInEventApi,
    ...options,
  });

  return mutation;
};
