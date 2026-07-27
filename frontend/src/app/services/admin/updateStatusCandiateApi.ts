import {  StatusUpdate } from "@/app/types";
import { axiosInstance } from "@/utils/axios";

export const updateStatusCandidateAPI = async (credentials: StatusUpdate) => {
  const response = await axiosInstance.post(
    "/admin/candidateMgmt/updateStatus",
    credentials
  );
  return response.data;
};
