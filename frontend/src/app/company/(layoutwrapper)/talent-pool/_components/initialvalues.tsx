import { educationInitialValues } from "./EducationFilter";
import { skillsInitialValues } from "./SkillsFilter";
import { careerInitialValues } from "./CareerFilter";
import { registrationInitialValues } from "./RegistrationFilter";

function defaultComparator(current: any, initial: any) {
  let count = 0;
  for (const k in current) {
    if (Array.isArray(current[k]) && current[k].length > 0) {
      count++;
    } else if (typeof current[k] === "object" && current[k] !== null) {
      if (Object.keys(current[k]).length > 0) {
        count++;
      }
    } else if (
      current[k] !== initial[k] &&
      current[k] !== null &&
      current[k] !== ""
    ) {
      count++;
    }
  }
  return count;
}

function skillsComparator(current: any, initial: any) {
  let count = 0;

  // Count selected languages
  if (Array.isArray(current.language) && current.language.length > 0) {
    count += current.language.length;
  }

  // Count selected technologies
  if (Array.isArray(current.technologies) && current.technologies.length > 0) {
    count += current.technologies.length;
  }

  // Count selected experience-linked technologies
  if (
    Array.isArray(current.experienceTechnologies) &&
    current.experienceTechnologies.length > 0
  ) {
    count += current.experienceTechnologies.length;
  }

  // Ignore `languageLevels` in counting
  // unless you specifically want to count when a level is chosen
  // Example: if you want to count only when a level is set:
  if (Array.isArray(current.languageLevels)) {
    count += current.languageLevels.filter(
      (l) => l.level && l.level !== "",
    ).length;
  }

  return count;
}

const comparators: any = {
  education: defaultComparator,
  skills: skillsComparator,
  careerExperience: defaultComparator,
  registrationDate: defaultComparator,
  category: defaultComparator,
  residencePermitIds: defaultComparator,
};

export const defaultValues: any = {
  education: educationInitialValues,
  skills: skillsInitialValues,
  careerExperience: careerInitialValues,
  registrationDate: registrationInitialValues,
  favoriteOnly: false,
  category: {},
  residencePermitIds: {},
};

type FilterId =
  | "education"
  | "skills"
  | "careerExperience"
  | "registrationDate"
  | "category"
  | "residencePermitIds";

export function getActiveFilters(id: any, values: any): any {
  const initial = defaultValues[id];
  const current = values[id];

  return comparators?.[id](current, initial);
}
