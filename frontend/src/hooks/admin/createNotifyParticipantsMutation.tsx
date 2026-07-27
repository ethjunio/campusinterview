import { createNotifyParticipants } from "@/app/services/admin/createNotifyParticipants";
import { useMutation } from "@tanstack/react-query";

export const createNotifyParticipantsMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createNotifyParticipants"],
    mutationFn: createNotifyParticipants,
    ...options,
  });

  return mutation;
};
