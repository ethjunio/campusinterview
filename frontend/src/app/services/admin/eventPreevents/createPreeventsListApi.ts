import { axiosInstance } from "@/utils/axios";

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

// Update the function to accept form data
export const createPreeventsListApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/admin/company-preevent/upsert", data);
  return response.data;  // Return the data from the response
};
