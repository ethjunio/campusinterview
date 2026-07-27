"use client"
import { FC, useEffect, useState } from 'react';
import { useField } from 'formik';
import { useTranslations } from 'next-intl';
import Select from 'react-select';
import { useGetPositionsDropdownQuery } from '@/hooks/student/profilemgmt/useGetPositionsDropdownQuery';

interface PositionFilterProps {
  name: string;
}

export const PositionFilter: FC<PositionFilterProps> = ({ name }) => {
  const t = useTranslations();
  const { data: positionsOptions } = useGetPositionsDropdownQuery();
  const [field, , helpers] = useField(name);
  const [options, setOptions] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    if (positionsOptions?.data) {
      const formattedOptions = positionsOptions.data.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));
      setOptions(formattedOptions);
    }
  }, [positionsOptions?.data]);

  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    helpers.setValue(selectedValues);
  };

  return (
    <Select
      className="mt-8 max-w-sm mb-4 cursor-pointer"
      isSearchable
      isClearable
      isMulti
      classNamePrefix="react-select"
      options={options}
      placeholder={t('common.placeholders.select-field')}
      onChange={handleChange}
      value={options.filter(option => field.value?.includes(option.value))}
    />
  );
};
