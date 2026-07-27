import { deleteWithdrawCompanyInterviewRequestApi } from "@/app/services/company/matching/deleteWithdrawcompanyInterviewRequestApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteWithdrawCompanyInterviewRequestMutation = (options = {}) => {
  return useMutation({
    mutationKey: ["deleteWithdrawCompanyInterviewRequest"],
    mutationFn: (interviewRequestId: any) => deleteWithdrawCompanyInterviewRequestApi(interviewRequestId),
    ...options,
  });
};
