import { createInterviewPublishApi } from "@/app/services/admin/createInterviewPublishApi";
import { useMutation } from "@tanstack/react-query";

export const createPublishInterviewMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createInterviewPublish"],
    mutationFn: createInterviewPublishApi,
    ...options,
  });

  return mutation;
};
