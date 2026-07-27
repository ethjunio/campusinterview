import { sendEmailAPI } from "@/app/services/admin/sendEmailApi";
import { useMutation } from "@tanstack/react-query";

export const useSendEmailMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["sendEmail"],
    mutationFn: sendEmailAPI,
    ...options,
  });

  return mutation;
};
