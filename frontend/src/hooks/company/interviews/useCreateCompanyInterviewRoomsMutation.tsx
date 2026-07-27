import { createCompanyInterviewRoomsApi } from "@/app/services/company/interviews/createCompanyInterviewRoomsApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateCompanyInterviewRoomsMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createCompanyInterviewRooms"],
    mutationFn: createCompanyInterviewRoomsApi,
    ...options,
  });

  return mutation;
};
