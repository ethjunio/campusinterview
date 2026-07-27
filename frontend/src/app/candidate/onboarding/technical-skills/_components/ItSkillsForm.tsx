"use client"
import React, { FC } from 'react';
import { FormikValues } from 'formik';
import { useTranslations } from 'next-intl';
import { TextAreaField } from '@/components/molecules/form/TextAreaField';
import { ListForm } from '../../extracurriculars/_components/ListForm';
import { SelectField, SelectFieldOther } from '@/components/molecules/form/SelectField';
import { InputField } from '@/components/molecules/form/InputField';

type Props = {
  newItem: {
    itSkill?: SelectOption;
    skillLevel?: SelectOption;
    description: string;
  };
  skills: SelectOption[];
  levels: SelectOption[];
  values: FormikValues;
  isSubmitting: boolean;
  handleSubmit: () => void;
};

type SelectOption = {
    value: any;
    label: string;
    name: string;
    id: string;
  };

export const ItSkillsForm: FC<Props> = ({
  newItem,
  values,
  skills,
  levels,
  isSubmitting,
  handleSubmit
}) => {
  const t = useTranslations();

  return (
    <ListForm
      isSubmitting={isSubmitting}
      name="itSkills"
      addLabel={t('candidate.itSkills.button-add')}
      removeLabel={t('common.button-remove')}
      values={values}
      newItem={newItem}
      onSubmit={handleSubmit}
      >
      <SelectFieldOther
        required
        name={`itSkill`}
        options={skills}
        label={t('candidate.itSkills.form-skill-label')}
        placeholder={t('candidate.itSkills.form-skill-placeholder')}>
        <InputField
          name="otherItSkill"
          label={t('candidate.itSkills.form-other-label')}
          placeholder={t('candidate.itSkills.form-other-placeholder')}
        />
      </SelectFieldOther>
      <SelectField
        required
        name={`skillLevel`}
        options={levels}
        label={t('candidate.itSkills.form-level-label')}
        placeholder={t('candidate.itSkills.form-level-placeholder')}
      />
      <TextAreaField
        name={`description`}
        label={t('candidate.itSkills.form-description-label')}
        placeholder={t('candidate.itSkills.form-description-placeholder')}
        rows={5}
      />
    </ListForm>
  );
};
