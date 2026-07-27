import { getEventDayRecordsAPI } from "@/app/services/admin/getEventDayRecordsApi";
import { useQuery } from "@tanstack/react-query";

interface EventDayRecord {
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

export const useGetEventDayRecordsQuery = (options: any = {}) => {
  return useQuery<{ data: EventDayRecord }>({
    queryKey: ["eventDayRecords"],
    queryFn: () => getEventDayRecordsAPI(),
    ...options,
  });
};
