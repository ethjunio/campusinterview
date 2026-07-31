export interface PermitOption {
  value: string;
  label: string;
}

export const swissPermitOptions: PermitOption[] = [
  { value: 'citizen', label: 'Swiss Citizen' },
  { value: 'b_permit', label: 'Permit B (Resident Foreign Nationals)' },
  { value: 'c_permit', label: 'Permit C (Settled Foreign Nationals)' },
  {
    value: 'l_permit',
    label: 'Permit L (Short-Term Resident Foreign Nationals)',
  },
  { value: 'g_permit', label: 'Permit G (Cross-Border Commuters)' },
  {
    value: 'f_permit',
    label: 'Permit F (Provisionally Admitted Foreign Nationals)',
  },
  { value: 'n_permit', label: 'Permit N (Asylum Seekers)' },
  { value: 's_permit', label: 'Permit S (People in Need of Protection)' },
  { value: 'none', label: 'No Permit / Not Yet Living in Switzerland' },
];

export function getIndexByPermitValue(
  value: string | null | undefined,
): number | undefined {
  if (value === null || value === undefined) return undefined;
  const index = swissPermitOptions.findIndex(
    (option) => option.value === value,
  );
  return index !== -1 ? index : undefined;
}

export function getPermitByIndex(
  index: number | string | null | undefined,
): PermitOption | undefined {
  if (index === null || index === undefined) return undefined;
  const parsedIndex = typeof index === 'string' ? parseInt(index, 10) : index;
  if (
    isNaN(parsedIndex) ||
    parsedIndex < 0 ||
    parsedIndex >= swissPermitOptions.length
  ) {
    return undefined;
  }
  return swissPermitOptions[parsedIndex];
}
