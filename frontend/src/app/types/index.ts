export interface DashboardCounts {
  candidate_count: number;
  company_count: number;
  total_bookings_count: number;
  approved_bookings_count: number;
  matches_count: number;
  interviews_count: number;
  active_user_count: number;
}

export interface Interview {
  map(arg0: (room: any) => { value: any; label: any }): unknown;
  id: number;
  isPublished: boolean;
  candidateId: string;
  companyId: string;
  timeSlotId: number;
  interviewRoomId: number;
  createdAt: string;
  updatedAt: string;
  time_slot_id: number;
  interview_room_id: number;
  company: Company;
  Candidate: Candidate;
  match: Match;
  timeSlot: TimeSlot;
  interviewRoom: InterviewRoom;
  interviewLocation: string;
}

export interface Company {
  id: string;
  name: string;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Match {
  id: number;
  state: string;
  requestedBy: string;
  candidateId: string;
  companyId: string;
  timeBlockPreference: any;
  interviewRoomId: any;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  id: number;
  timeRange: string;
}

export interface InterviewRoom {
  id: number;
  name: string;
  companyId: string;
}

export interface InfoBox {
  id: number;
  companyMarkdown: string;
  candidateMarkdown: string;
  candidateTopPicks: string;
  businessMenuMarkdown: string;
  economyMenuMarkdown: string;
  companyButtonDescription: string;
  companyButtonText: string;
  companyButtonLink: string;
  companyButtonVisibility: boolean;
}

export interface InfoBoxCredentials {
  companyMarkdown: string;
  candidateMarkdown: string;
  candidateTopPicks: string;
  businessMenuMarkdown: string;
  economyMenuMarkdown: string;
  companyButtonDescription: string;
  companyButtonText: string;
  companyButtonLink: string;
  companyButtonVisibility: boolean;
}
export interface StatusUpdate {
  profileIds:string[]
  profileStatus:string
}


interface Industry {
  id: number;
  name: string;
}

interface CompanyUser {
  email: string;
}

export interface Company {
  id: string;
  userId: string;
  imageUrlLarge: string;
  imageUrlMedium: string;
  imageUrlSmall: string;
  name: string;
  website: string;
  onboardingState: string;
  corporateActivity: string;
  description: string;
  philosophy: string;
  swissOfficeLocation: string;
  headquarterLocation: string;
  swissEmployeeCount: number;
  worldEmployeeCount: number;
  shareOfGraduates: string;
  lookingFor: string;
  culture: string;
  weOffer: string;
  startingSalary: string;
  approved: boolean;
  registrationDate: string;
  mainLanguageId: number;
  interviewSlots: number;
  areDailyNotificationsEnabled: boolean;
  keepProfile: boolean;
  industries: Industry[];
  user: CompanyUser;
}

interface University {
  id: number;
  name: string;
}

interface Education {
  id: number;
  candidateId: string;
  universityId: number;
  otherUniversity: string;
  educationLevelId: number;
  fieldOfStudyId: number;
  otherMajor: string;
  specializationId: number | null;
  otherSpecialization: string;
  startDate: string;
  endDate: string;
  averageGrade: number | null;
  university: University;
}

export interface Candidate {
  id: string;
  userId: string;
  onboardingState: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  salutation: string;
  phoneNumber: string;
  imageUrlLarge: string;
  imageUrlMedium: string;
  imageUrlSmall: string;
  country: string;
  city: string;
  registrationDate: string;
  areMatchingNotificationsEnabled: boolean;
  areChatNotificationsEnabled: boolean;
  keepProfile: boolean;
  nationalityId: number;
  residencePermitId: number;
  user_id: string;
  education: Education[];
  email: string;
  profileStatus:string

}

export interface DeleteCompaniesCredentials {
  id: string;
}

export interface DeleteCandidateCredentials {
  id: string;
}
interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface User {
  email: string;
}

export interface CompanyContact {
  id: string;
  name: string;
  CompanyContacts: Contact[];
  user: User;
}

export interface LandingPageInfo {
  id: number;
  mainPageStudentsBox: string;
  mainPageCompaniesBox: string;
  mainPageWhatBox: string;
  mainPageWhoBox: string;
  candidatePageRegistrationBox: string;
  candidatePageMakeCVBox: string;
  candidatePageRequestInterviewsBox: string;
  candidatePageInterviewDayBox: string;
  companyPageWhyBox: string;
  companyPageRegistrationBox: string;
  companyPageBookingBox: string;
  companyPageRequestInterviewsBox: string;
  companyPageInterviewDayBox: string;
  companyPageBenefitBox: string;
  agendaInterviewsRange: string;
  agendaLunchRange: string;
  agendaSnacksRange: string;
  locationLine1: string;
  locationLine2: string;
  locationLine3: string;
  distribution_degree_id: string;
  distribution_study_fields_id: string;
  distributionDegrees: {
    id: number;
    master: string;
    bachelor: string;
    phd: string;
  };
  distributionStudyFields: {
    id: number;
    engineering: string;
    naturalSciences: string;
    economics: string;
    other: string;
  };
}

export interface EventPreeventsList {
  id: number;
  title: string;
  eventDate: string; // Use `Date` if you parse this string into a Date object.
  address: string;
  maxParticipants: number;
  imageUrl: string;
  company: {
    id: string;
    name: string;
  };
  participantCount: number;
}

export interface DeletePreeveentsCredentials {
  id: string;
}

export interface DeleteBookingsListCredentials {
  id: string;
}
