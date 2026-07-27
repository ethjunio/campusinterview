import { useQuery } from "@tanstack/react-query";
import { getCompanyGeneralDataApi } from "@/app/services/company/onboarding/getCompanyGeneralDataApi";

export const useGetCompanyGeneralDataQuery = (options: any = {}) => {
  return useQuery<{
    imageUrlLarge: string;
    offeredPositionTypes: any;
    ContactLanguage: any;
    mainLanguageId: string;
    startingSalary: string;
    weOffer: string;
    lookingFor: string;
    culture: string;
    fieldsOfStudy: any;
    participants: any;
    CompanyIndustries: any;
    CompanyContacts: never[];
    website: string;
    industries: number;
    description: string;
    name: string;
    philosophy: string;
    corporateActivity: string;
    swissOfficeLocation: string;
    headquarterLocation: string;
    swissEmployeeCount: number;
    worldEmployeeCount: number;
    shareOfGraduates: number;
    imageUrlSmall: string;
    data: any;
  }>({
    queryKey: ["getCompanyGeneralData"],
    queryFn: () => getCompanyGeneralDataApi(),
    ...options,
  });
};
