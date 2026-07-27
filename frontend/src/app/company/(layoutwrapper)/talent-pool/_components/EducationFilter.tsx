import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import { SelectField } from '@/components/molecules/form/SelectField';
import { dataToOption } from '@/utils';
import { useGetMajorsDropdownQuery, useGetSpecializationDropdownQuery, useGetUniversityDropdownQuery } from '@/hooks/student/onboardingmgmt/useGetEducationalFormHooks';
import { useGetEducationLevelQuery } from '@/hooks/student/onboardingmgmt/useGetEducationLevelQuery';

export const educationInitialValues = {
  university: null,
  specialization: null,
  major: null,
  educationLevel: null,
};


export const EducationFilter: FC = () => {
  const t = useTranslations();
  const { data: universities } = useGetUniversityDropdownQuery();
  const { data: majors } = useGetMajorsDropdownQuery();
  const { data: levels } = useGetEducationLevelQuery();
  const { data: specializations } = useGetSpecializationDropdownQuery();

  return (
    <>
      <SelectField
        isMulti
        isClearable={false}
        label={t('companies.talent-pool.filter-university-label')}
        placeholder={t('common.placeholders.select-field')}
        name="education.university"
        options={universities?.data.map(dataToOption) || []}
      />

      <SelectField
        isMulti
        isSearchable
        isClearable={false}
        label={t('companies.talent-pool.filter-major-label')}
        placeholder={t('common.placeholders.select-field')}
        name="education.major"
        options={majors?.data.map(dataToOption) || []}
      />

      <SelectField
        isMulti
        isSearchable
        isClearable={false}
        label={t('companies.talent-pool.filter-specialization-label')}
        placeholder={t('common.placeholders.select-field')}
        name="education.specialization"
        options={specializations?.data.map(dataToOption) || []}
      />

      <SelectField
        isMulti
        label={t('companies.talent-pool.filter-education-level-label')}
        placeholder={t('common.placeholders.select-field')}
        name="education.educationLevel"
        options={levels?.data.map(dataToOption) || []}
      />
    </>
  );
};
