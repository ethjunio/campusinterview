export interface EducationLevelOption {
  value: string;
  label: string;
}

export const educationLevelOptions: EducationLevelOption[] = [
  { value: 'doctorate', label: 'PhD / Doctorate' },
  { value: 'master', label: 'Master\'s Degree (University / ETH / FH)' },
  { value: 'bachelor', label: 'Bachelor\'s Degree (University / ETH / FH)' },
  { value: 'higher_vocational', label: 'Advanced Federal Diploma / College of Higher Education (HF / FA)' },
  { value: 'vocational_training', label: 'Federal Diploma of Vocational Education and Training (EFZ)' },
  { value: 'high_school', label: 'High School / Matura / Gymnasialer Abschluss' },
  { value: 'lower_secondary', label: 'Secondary School / Sekundarstufe I' },
  { value: 'other', label: 'Other / No Formal Degree' }
];

export function getEducationByIndex(index: number | string | null): EducationLevelOption | null {
  if (index === null || index === undefined) return null;
  const parsedIndex = typeof index === 'string' ? parseInt(index, 10) : index;
  if (isNaN(parsedIndex) || parsedIndex < 0 || parsedIndex >= educationLevelOptions.length) {
    return null;
  }
  return educationLevelOptions[parsedIndex];
}

export function getEducationIndexByValue(value: string | null): number | null {
  if (value === null || value === undefined) return null;
  const index = educationLevelOptions.findIndex(option => option.value === value);
  return index !== -1 ? index : null;
}
