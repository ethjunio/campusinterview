import { getPrevNextCandidateByIdApi } from "@/app/services/company/talent-pool/getPrevNextCandidateByIdApi";
import { useQuery } from "@tanstack/react-query";

function getQueryParamsFromLocalStorage() {
  const raw = localStorage.getItem("talent-pool-filters");
  const sortBy = localStorage.getItem("talentPoolSortOrder");
  const searchValue = localStorage.getItem("talentPoolSearch");

  const params: Record<string, string> = {};

  // Always include search and sort, regardless of `raw`
  try {
    params.sortName = JSON.parse(sortBy ?? '"firstName"');
  } catch {
    params.sortName = "firstName";
  }

  try {
    params.search = JSON.parse(searchValue ?? '""');
  } catch {
    params.search = "";
  }

  if (!raw) return params; // Return search/sort even if filters are missing

  let filters: any = {};
  try {
    filters = JSON.parse(raw);
  } catch {
    return params;
  }

  const mapArrayToCSV = (arr: any[]) =>
    Array.isArray(arr) ? arr.map(item => item.value).join(",") : "";

  // Career Experience
  const career = filters?.careerExperience;
  if (career) {
    if (Array.isArray(career.interest)) {
      params.interestIds = mapArrayToCSV(career.interest);
    }

    if (career.experiencesNumber !== null && career.experiencesNumber !== undefined) {
      params.experienceCount = String(career.experiencesNumber);
    }

    if (career.desiredWorkArea) {
      params.workAreaIds = mapArrayToCSV(career.desiredWorkArea);
    }

    if (career.desiredJobType) {
      params.offeredPosIds = mapArrayToCSV(career.desiredJobType);
    }

    if (career.startDate) {
      params.canStartDate = career.startDate;
    }
  }

  // Education
  const education = filters?.education;
  if (education) {
    if (Array.isArray(education.university)) {
      params.universityIds = mapArrayToCSV(education.university);
    }

    if (Array.isArray(education.specialization)) {
      params.specializationIds = mapArrayToCSV(education.specialization);
    }

    if (Array.isArray(education.major)) {
      params.majorIds = mapArrayToCSV(education.major);
    }

    if (Array.isArray(education.educationLevel)) {
      params.educationlevelIds = mapArrayToCSV(education.educationLevel);
    }
  }

  // Skills
  const skills = filters?.skills;
  if (skills) {
    if (Array.isArray(skills.language)) {
      params.languageIds = mapArrayToCSV(skills.language);
    }

    if (Array.isArray(skills.technologies)) {
      params.technologiesIds = mapArrayToCSV(skills.technologies);
    }
  }

  // Category
  const category = filters?.category?.category;
  if (Array.isArray(category) && category.length > 0) {
    params.categoryEnums = mapArrayToCSV(category);
  }

  // Registration Date
  const reg = filters?.registrationDate;
  if (reg) {
    if (reg.registrationDateAfter) {
      params.registrationDateAfter = reg.registrationDateAfter;
    }
    if (reg.registrationDateBefore) {
      params.registrationDateBefore = reg.registrationDateBefore;
    }
  }

  return params;
}



export const useGetPrevNextCandidateByIdQuery = (id: any, options: any = {}) => {
  const queryParams = typeof window !== "undefined" ? getQueryParamsFromLocalStorage() : {};

  return useQuery<{ data: any }>({
    queryKey: ["getPrevNextCandidateById", id, queryParams],
    queryFn: () => getPrevNextCandidateByIdApi(id, queryParams),
    enabled: !!id,
    ...options,
  });
};
