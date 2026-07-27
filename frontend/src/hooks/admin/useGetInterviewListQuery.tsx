import {
  getAllInterviewAndCandidateListAPI,
  getCandidateByIdAPI,
  getExportPreScheduledDataAPI,
  getExportScheduledDataAPI,
  getInterViewRoomsAPI,
  getInterviewsListAPI,
  getTimeSlotsAPI,
} from "@/app/services/admin/getInterviewsListApi";
import { Interview } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { JSX } from "react";

export const useGetInterviewListQuery = (
  options: any = {},
  candidateName: string | null,
  companyName: string | null
) => {
  return useQuery<{
    map(
      arg0: ({
        id,
        Candidate,
        company,
        timeSlot,
        interviewRoom,
      }: {
        id: any;
        Candidate: any;
        company: any;
        timeSlot: any;
        interviewRoom: any;
      }) => JSX.Element
    ): import("react").ReactNode;
    data: Interview[];
  }>({
    queryKey: ["interviewsList", companyName, candidateName],
    queryFn: () => getInterviewsListAPI(companyName, candidateName),
    ...options,
  });
};

export const useGetCandidateByIdQuery = (options: any = {}, id: string) => {
  return useQuery<{ data: Interview }>({
    queryKey: ["candidateById", id],
    queryFn: () => getCandidateByIdAPI(id),
    ...options,
  });
};

export const useGetTimeSlotsQuery = (options: any = {}) => {
  return useQuery<{ data: Interview }>({
    queryKey: ["timingSlots"],
    queryFn: () => getTimeSlotsAPI(),
    ...options,
  });
};

export const useGetInterViewRoomsQuery = (options: any = {}, id: string) => {
  return useQuery<{ data: Interview }>({
    queryKey: ["interviewRooms", id],
    queryFn: () => getInterViewRoomsAPI(id),
    ...options,
  });
};

export const useGetCompanyNamesWithContactQuery = (options: any = {}) => {
  return useQuery<{
    company: any;
    candidate: any;
    data: Interview;
  }>({
    queryKey: ["companyNamesWithContact"],
    queryFn: () => getAllInterviewAndCandidateListAPI(),
    ...options,
  });
};

export const useGetPreScheduledDataQuery = (options: any = {}) => {
  return useQuery<{ data: Interview }>({
    queryKey: ["preScheduledData"],
    queryFn: () => getExportPreScheduledDataAPI(),
    ...options,
  });
};

export const useGetScheduledDataQuery = (options: any = {}) => {
  return useQuery<{ data: Interview }>({
    queryKey: ["scheduledData"],
    queryFn: () => getExportScheduledDataAPI(),
    ...options,
  });
};
