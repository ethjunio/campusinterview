import { updateTimePreferenceApi } from "@/app/services/student/interviewMgmt/updateTimePreferenceApi";
import { useMutation } from "@tanstack/react-query";

export const useUpdateTimePreferenceMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["updateTimePreferences"],
    mutationFn: updateTimePreferenceApi,
    ...options,
  });

  return mutation;
};
