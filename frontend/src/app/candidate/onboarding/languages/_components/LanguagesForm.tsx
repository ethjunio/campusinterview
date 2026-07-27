"use client"
import React, { FC } from 'react';
import { FormikValues } from 'formik';
import { useTranslations } from 'next-intl';
import { TextAreaField } from '@/components/molecules/form/TextAreaField';
import { ListForm } from '../../extracurriculars/_components/ListForm';
import { SelectField } from '@/components/molecules/form/SelectField';

type SelectOption = {
  value: any;
  label: string;
};

type Props = {
  newItem: {
    language?: SelectOption;
    languageLevel?: SelectOption;
    qualification: string;
  };
  languages: SelectOption[];
  levels: SelectOption[];
  values: FormikValues;
  isSubmitting: boolean;
  handleSubmit: () => void;
  setFieldValue: (field: string, value: any) => void;
};

export const LanguagesForm: FC<Props> = ({
  newItem,
  values,
  isSubmitting,
  languages,
  levels,
  handleSubmit,
  setFieldValue,
}) => {
  const t = useTranslations("candidate");
  return (
    <ListForm
      isSubmitting={isSubmitting}
      name="languages"
      addLabel={t('languages.button-add')}
      removeLabel={t('languages.button-remove')}
      values={values}
      newItem={newItem}
      onSubmit={handleSubmit}
    >
      <SelectField
        required
        isSearchable
        name={`language`}
        options={languages}
        label={t('languages.form-language-label')}
        placeholder={t('languages.form-language-placeholder')}
      />
      <SelectField
        required
        name={`languageLevel`}
        options={levels}
        label={t('languages.form-level-label')}
        placeholder={t('languages.form-level-placeholder')}
      />
      <TextAreaField
        name={`qualification`}
        label={t('languages.form-qualification-label')}
        placeholder={t('languages.form-qualification-placeholder')}
        rows={5}
      />
    </ListForm>
  );
};

