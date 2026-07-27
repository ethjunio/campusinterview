import { InfoBoxCredentials } from "@/app/types";
import { axiosInstance } from "@/utils/axios";

export interface LandingPageInfo {
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
  distributionDegrees: {
    master: string;
    bachelor: string;
    phd: string;
  };
  distributionStudyFields: {
    engineering: string;
    naturalSciences: string;
    economics: string;
    other: string;
  };
}

export const updateLandingPageInfoAPI = async (
  credentials: LandingPageInfo
) => {
  const response = await axiosInstance.put(
    "/admin/landingPageMgmt/updateLandingPageInfo",
    credentials
  );
  return response.data;
};
