import { updateCampusSwitchBoxDataAPI } from "@/app/services/admin/updateCampusSwitchBoxDataApi";
import { updateInfoBoxDataAPI } from "@/app/services/admin/updateInformationBoardApi";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCampusSwitchBoxDataMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["updateCampusSwitchDataMutation"],
    mutationFn: updateCampusSwitchBoxDataAPI,
    ...options,
  });

  return mutation;
};
