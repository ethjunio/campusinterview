import { saveSettingsApi } from "@/app/services/company/profile/setting";
import { useMutation } from "@tanstack/react-query";

export const useSaveProfileSettingsMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["saveProfileSettings"],
    mutationFn: saveSettingsApi,
    ...options,
  });

  return mutation;
};
