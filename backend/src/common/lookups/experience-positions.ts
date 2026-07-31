export interface ExperiencePositionOption {
  value: string;
  label: string;
}

export const experiencePositionOptions: ExperiencePositionOption[] = [
  { value: 'executive', label: 'Executive / C-Level (CEO, CFO, Board)' },
  {
    value: 'senior_management',
    label: 'Senior Management (Head of, Director)',
  },
  {
    value: 'middle_management',
    label: 'Middle Management (Team Lead, Manager)',
  },
  {
    value: 'senior_professional',
    label: 'Senior Professional (5+ years experience)',
  },
  { value: 'professional', label: 'Professional (2-5 years experience)' },
  {
    value: 'junior_professional',
    label: 'Junior Professional (0-2 years experience)',
  },
  { value: 'graduate_trainee', label: 'Graduate / Trainee' },
  { value: 'student_intern', label: 'Student / Intern' },
];

export function getExperienceByIndex(
  index: number | string | null,
): ExperiencePositionOption | null {
  if (index === null || index === undefined) return null;
  const parsedIndex = typeof index === 'string' ? parseInt(index, 10) : index;
  if (
    isNaN(parsedIndex) ||
    parsedIndex < 0 ||
    parsedIndex >= experiencePositionOptions.length
  ) {
    return null;
  }
  return experiencePositionOptions[parsedIndex];
}

export function getExperienceIndexByValue(value: string | null): number | null {
  if (value === null || value === undefined) return null;
  const index = experiencePositionOptions.findIndex(
    (option) => option.value === value,
  );
  return index !== -1 ? index : null;
}
