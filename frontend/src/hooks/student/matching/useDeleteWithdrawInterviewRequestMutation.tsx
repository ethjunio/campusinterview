import { deleteWithdrawInterviewRequestApi } from "@/app/services/student/matching/deleteWithdrawInterviewRequestApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteWithdrawInterviewRequestMutation = (options = {}) => {
  return useMutation({
    mutationKey: ["deleteWithdrawInterviewRequest"],
    mutationFn: (interviewRequestId: any) => deleteWithdrawInterviewRequestApi(interviewRequestId),
    ...options,
  });
};
