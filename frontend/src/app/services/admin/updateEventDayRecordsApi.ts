import { InfoBoxCredentials } from "@/app/types";
import { axiosInstance } from "@/utils/axios";

export interface EventDayRecords {
  areParticipantsNotified: boolean;
  eventName: string;
  eventDate: string;
  registrationOpenDate: string;
  companyRegistrationCloseDate: string;
  candidateRegistrationCloseDate: string;
  matchingOpenDate: string;
  matchingCloseDate: string;
  signInCloseDate: string;
  companyBookingCloseDate: string;
  areInterviewsPublished: boolean;
  maxCountPerCompany: number;
  economyRooms: number;
  businessRooms: number;
  workshopRooms: number;
  presentations: number;
  companyPresentations: number;
  miniBooths: number;
  workshops: number;
}

export const updateEventDayRecordsAPI = async (
  credentials: EventDayRecords
) => {
  const response = await axiosInstance.put(
    "/admin/eventDayMgmt/updateEventDayRecords",
    credentials
  );
  return response.data;
};
