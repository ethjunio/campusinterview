import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import { SelectField } from '@/components/molecules/form/SelectField';
import { dataToOption } from '@/utils/index';

export const candidateCategoryOptions = [
  { id: 'Ranking', name: 'Ranking' },
  { id: '1', name: '1' },
  { id: '2', name: '2' },
  { id: '3', name: '3' },
  { id: '4', name: '4' },
  { id: '5', name: '5' },
];

export const categoryInitialValues = {
  category: '',
};

export const CategoryFilter: FC = () => {
  const t = useTranslations();

  return (
    <>
      <SelectField
        isMulti
        isClearable={false}
        isSearchable
        placeholder={t('common.placeholders.select-field')}
        name="category.category"
        options={candidateCategoryOptions.map(dataToOption)}
      />
    </>
  );
};
