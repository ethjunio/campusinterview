import { createTimeSlotsApi } from "@/app/services/student/interviewMgmt/createTimeSlotsApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateTimeSlotsMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createTimeSlots"],
    mutationFn: createTimeSlotsApi,
    ...options,
  });

  return mutation;
};
