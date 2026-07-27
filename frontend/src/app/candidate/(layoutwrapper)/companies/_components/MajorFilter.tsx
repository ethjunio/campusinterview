"use client"
import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Select from 'react-select';
import { useField } from 'formik';
import { useGetMajorsDropdownQuery } from '@/hooks/student/onboardingmgmt/useGetEducationalFormHooks';

interface MajorFilterProps {
  name: string;
}

export const MajorFilter: FC<MajorFilterProps> = ({ name }) => {
  const t = useTranslations();
  const { data: majorsOptions } = useGetMajorsDropdownQuery();
  const [field, , helpers] = useField(name);
  const [searchDataMajors, setSearchDataMajors] = useState<any[]>([]);

  useEffect(() => {
    if (majorsOptions?.data) {
      const formattedOptions = majorsOptions.data.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));
      setSearchDataMajors(formattedOptions);
    }
  }, [majorsOptions?.data]);

  return (
    <Select
      className="mt-8 max-w-sm mb-4 cursor-pointer"
      isSearchable
      isClearable
      isMulti
      classNamePrefix="react-select"
      options={searchDataMajors}
      placeholder={t('common.placeholders.select-field')}
      onChange={(selectedOptions) => {
        const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
        helpers.setValue(values);
      }}
      value={searchDataMajors.filter((option) => field.value?.includes(option.value))}
    />
  );
};
