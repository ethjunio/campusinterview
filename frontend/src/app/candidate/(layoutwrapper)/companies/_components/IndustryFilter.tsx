"use client"
import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Select from 'react-select';
import { useField } from 'formik';
import { useGetIndustriesDropdownQuery } from '@/hooks/student/companymgmt/useGetIndustriesDropdownQuery';

interface IndustryFilterProps {
  name: string;
}

export const IndustryFilter: FC<IndustryFilterProps> = ({ name }) => {
  const t = useTranslations();
  const { data: industries } = useGetIndustriesDropdownQuery();
  const [field, , helpers] = useField(name);
  const [searchDataIndustry, setSearchDataIndustry] = useState<any[]>([]);

  useEffect(() => {
    if (industries?.data) {
      const options = industries.data.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));
      setSearchDataIndustry(options);
    }
  }, [industries?.data]);

  return (
    <Select
      className="mt-8 max-w-sm mb-4 cursor-pointer"
      isSearchable
      isClearable
      isMulti
      classNamePrefix="react-select"
      options={searchDataIndustry}
      placeholder={t('common.placeholders.select-field')}
      onChange={(selectedOptions) => {
        const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
        helpers.setValue(values);
      }}
      value={searchDataIndustry.filter((option) => field.value?.includes(option.value))}
    />
  );
};
