import {
  createInterviewAPI,
  deleteAllInterviewAPI,
  deleteInterviewAPI,
  updateChatRoomsAPI,
  updateInterviewAPI,
} from "@/app/services/admin/getInterviewsListApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteInterviewMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["useDeleteInterview"],
    mutationFn: deleteInterviewAPI,
    ...options,
  });

  return mutation;
};
export const useDeleteAllInterviewMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["useDeleteAllInterview"],
    mutationFn: deleteAllInterviewAPI,
    ...options,
  });

  return mutation;
};

export const useUpdateInterviewMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["useUpdateInterview"],
    mutationFn: updateInterviewAPI,
    ...options,
  });

  return mutation;
};
export const useCreateInterviewMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createInterview"],
    mutationFn: createInterviewAPI,
    ...options,
  });

  return mutation;
};

export const useUpdateChatRoomsMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["updateChatRooms"],
    mutationFn: updateChatRoomsAPI,
    ...options,
  });

  return mutation;
};
