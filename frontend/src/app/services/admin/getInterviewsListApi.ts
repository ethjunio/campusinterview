import { axiosInstance } from "@/utils/axios";

export const getInterviewsListAPI = async (
  companyName?: string | null,
  candidateName?: string | null
) => {
  let query = "";

  if (companyName) {
    query += `?companyName=${encodeURIComponent(companyName)}`;
  }

  if (candidateName) {
    query += query
      ? `&candidateName=${encodeURIComponent(candidateName)}`
      : `?candidateName=${encodeURIComponent(candidateName)}`;
  }

  const response = await axiosInstance.get(`/admin/interviews${query}`);
  return response.data;
};

export const getCandidateByIdAPI = async (id: string) => {
  const response = await axiosInstance.get(`/admin/interviews/${id}`);
  return response.data;
};

export const getTimeSlotsAPI = async () => {
  const response = await axiosInstance.get("/admin/interviews/getTimeSlots");
  return response.data;
};

export const getInterViewRoomsAPI = async (companyId: string) => {
  const response = await axiosInstance.get(
    `/admin/interview/rooms?companyId=${companyId}`
  );
  return response.data;
};

export const deleteInterviewAPI = async (id: string) => {
  const response = await axiosInstance.delete(`/admin/interviews/${id}`);
  return response.data;
};

export const updateInterviewAPI = async (data: any) => {
  const response = await axiosInstance.put(`/admin/interviews`, data);
  return response.data;
};

export const createInterviewAPI = async (data: any) => {
  const response = await axiosInstance.post(`/admin/interview`, data);
  return response.data;
};

export const deleteAllInterviewAPI = async () => {
  const response = await axiosInstance.delete(`/admin/interviews`);
  return response.data;
};

export const getAllInterviewAndCandidateListAPI = async () => {
  const response = await axiosInstance.get(
    `/admin/interviews-candidates-companies`
  );
  return response.data;
};

export const updateChatRoomsAPI = async (data: any) => {
  const response = await axiosInstance.put(`/admin/interview/rooms`, data);
  return response.data;
};

export const getExportPreScheduledDataAPI = async () => {
  const response = await axiosInstance.get(`/admin/arranged-int-export`);
  return response.data;
};

export const getExportScheduledDataAPI = async () => {
  const response = await axiosInstance.get(`/admin/int-export`);
  return response.data;
};
