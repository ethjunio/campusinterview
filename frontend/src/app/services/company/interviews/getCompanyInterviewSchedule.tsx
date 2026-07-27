import { axiosInstance } from "@/utils/axios";
export interface CompanyInterviewScheduleResponse {
  status: boolean;
  message: string;
  data: any;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface InterviewRoomSchedule {
  interviewRoom: InterviewRoom;
  interviewList: Interview[];
}

export interface InterviewRoom {
  id: number;
  name: string;
  companyId: string;
  slot: number;
  companyBookingId: number;
}

export interface Interview {
  id: number;
  isPublished: boolean;
  candidateId: string;
  companyId: string;
  matchId: number | null;
  timeSlotId: number | null;
  interviewRoomId: number;
  isAdminCreated: number;
  isAdminEdited: number;
  company: Company;
  candidate: Candidate;
  timeSlot: TimeSlot | null;
  interviewRoom: InterviewRoom;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  imageUrlSmall: string;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  imageUrlSmall: string | null;
  education: Education[];
}

export interface Education {
  id: number;
  candidateId: string;
  universityId: number;
  otherUniversity: string | null;
  educationLevelId: number;
  fieldOfStudyId: number;
  otherMajor: string | null;
  specializationId: number | null;
  otherSpecialization: string | null;
  startDate: string;
  endDate: string | null;
  averageGrade: string | null;
  university: University;
  educationLevel: EducationLevel;
  major: Major;
}

export interface University {
  id: number;
  name: string;
}

export interface EducationLevel {
  id: number;
  name: string;
}

export interface Major {
  id: number;
  name: string;
}

export interface TimeSlot {
  id: number;
  timeRange: string;
}

export const getCompanyInterviewSchedule = async (page:any,debouncedInput:any): Promise<CompanyInterviewScheduleResponse> => {
  const response = await axiosInstance.get(
    `/company/interviewMgmt/getCompanyInterviewSchedule${debouncedInput?`?room=${debouncedInput}&page=1`:`?page=${page}`}`
  );
  return response.data;
};
export const getCompanyInterviewScheduleRoom = async (): Promise<CompanyInterviewScheduleResponse> => {
  const response = await axiosInstance.get(
    `/company/interviewMgmt/getInterviewRooms`
  );
  return response.data;
};
