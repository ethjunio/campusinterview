import { createInviteParticipantsInAdminApi } from "@/app/services/admin/preevents/createInviteParticipantsInAdminApi";
import { createInviteParticipantsApi } from "@/app/services/company/preevent/createInviteParticipantsApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateInviteParticipantsInAdminMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createInviteParticipantsInAdmin"],
    mutationFn: createInviteParticipantsInAdminApi,
    ...options,
  });

  return mutation;
};
