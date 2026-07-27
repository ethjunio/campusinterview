import { updateEventDayRecordsAPI } from "@/app/services/admin/updateEventDayRecordsApi";
import { useMutation } from "@tanstack/react-query";

export const useUpdateEventDayRecordMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["updateEventDayRecordMutation"],
    mutationFn: updateEventDayRecordsAPI,
    ...options,
  });

  return mutation;
};
