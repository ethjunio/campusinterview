import {
  adminCreateInterviewsApi,
  adminUpdateInterviewsApi,
} from "@/app/services/admin/adminCreateInterviewsApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateAdminCreateInterviewsMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["adminCreateInterviews"],
    mutationFn: adminCreateInterviewsApi,
    ...options,
  });

  return mutation;
};
export const useUpdateAdminCreateInterviewsMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["adminCreateInterviews"],
    mutationFn: adminUpdateInterviewsApi,
    ...options,
  });

  return mutation;
};
