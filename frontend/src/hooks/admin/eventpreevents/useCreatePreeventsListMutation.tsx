import { createPreeventsListApi } from "@/app/services/admin/eventPreevents/createPreeventsListApi";
import { useMutation } from "@tanstack/react-query";

// Define the form data type
type PreeventFormData = {
  title: string;
  company: { value: string; label: string };
  eventDate: string;
  eventTime: string;
  registrationDeadline: string;
  address: string;
  website: string;
  maxParticipants: number | null;
  description: string;
  imageUrl: string; // Add other fields as necessary
};

export const useCreatePreeventsListMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["useCreatePreeventsListMutation"],
    mutationFn: createPreeventsListApi,
    ...options,
  });

  return mutation;
};
