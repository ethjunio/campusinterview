import { createInviteParticipantsApi } from "@/app/services/company/preevent/createInviteParticipantsApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateInviteParticipantsMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createInviteParticipants"],
    mutationFn: createInviteParticipantsApi,
    ...options,
  });

  return mutation;
};
