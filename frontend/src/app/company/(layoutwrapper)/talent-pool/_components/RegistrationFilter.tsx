"use client";
import React, { FC } from "react";
import { useTranslations } from "next-intl";
import { DatePickerField } from "@/app/candidate/(layoutwrapper)/profile/(layoutforms)/extracurriculars/_components/DatePickerField";

export const registrationInitialValues = {
  before: null,
  after: null,
};

export const RegistrationSkills: FC = () => {
  const t = useTranslations("companies");

  return (
    <>
      <div className="pb-6">
        <DatePickerField
          label={t("talent-pool.filter-registration-after-label")}
          name="registrationDate.after"
          placeholder="Choose"
          today={true}
        />
      </div>
      <div className="pb-6">
        <DatePickerField
          label={t("talent-pool.filter-registration-before-label")}
          name="registrationDate.before"
          placeholder="Choose"
          today={true}
        />
      </div>
    </>
  );
};
