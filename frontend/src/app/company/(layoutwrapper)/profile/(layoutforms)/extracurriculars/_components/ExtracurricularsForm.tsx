"use client";
import React, { FC } from "react";
import { FormikValues } from "formik";
import { useTranslations } from "next-intl";
import { InputField } from "@/components/molecules/form/InputField";
import { TextAreaField } from "@/components/molecules/form/TextAreaField";
import { ListsForm } from "./ListsForm";
import { DatePickerField } from "./DatePickerField";

type Props = {
  newItem: {
    title: string;
    activity: string;
    description: string;
    startDate: string;
    endDate: string;
  };
  values: FormikValues;
  isSubmitting: boolean;
};

export const ExtracurricularsForm: FC<Props> = ({
  newItem,
  values,
  isSubmitting,
}) => {
  const t = useTranslations("candidate");

  return (
    <ListsForm
      isSubmitting={isSubmitting}
      name="extras"
      addLabel={t("extracurriculars.button-add")}
      removeLabel={t("extracurriculars.button-remove")}
      values={values}
      newItem={newItem}
    >
      <InputField
        required
        name="title"
        label={t("extracurriculars.form-title-label")}
        placeholder={t("extracurriculars.form-title-placeholder")}
      />
      <InputField
        required
        name="activity"
        label={t("extracurriculars.form-activity-label")}
        placeholder={t("extracurriculars.form-activity-placeholder")}
      />

      <div className="flex sm:max-w-xs xl:max-w-md justify-between flex-col lg:flex-row gap-3 mb-5">
        <DatePickerField
          required
          name="startDate" // This will be transformed to `extras[index].startDate` by ListsForm
          label={t("extracurriculars.form-start-date")}
          placeholder={t("extracurriculars.form-startDate-placeholder")}
        />

        <DatePickerField
          name="endDate" // This will be transformed to `extras[index].endDate` by ListsForm
          label={t("extracurriculars.form-end-date")}
          placeholder={t("extracurriculars.form-endDate-placeholder")}
        />
      </div>

      <TextAreaField
        name="description"
        label={t("extracurriculars.form-description-label")}
        placeholder={t("extracurriculars.form-description-placeholder")}
        rows={5}
      />
    </ListsForm>
  );
};
