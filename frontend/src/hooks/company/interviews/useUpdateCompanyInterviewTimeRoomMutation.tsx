import { updateInterviewTimeRoomSlot } from "@/app/services/company/interviews/updateInteviewTimeRoom.Api";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCompanyInterviewMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["useUpdateCompanyInterview"],
    mutationFn: updateInterviewTimeRoomSlot,
    ...options,
  });

  return mutation;
};
