import React, { FC } from "react";
import { useTranslations } from "next-intl";
import { SelectField } from "@/components/molecules/form/SelectField";
import { dataToOption } from "@/utils";
import {
  useGetInterestDropdownQuery,
  useGetWorkDropdownQuery,
} from "@/hooks/student/onboardingmgmt/useGetCandidateFormHooks";
import { useGetPositionsDropdownQuery } from "@/hooks/student/profilemgmt/useGetPositionsDropdownQuery";
import { DatePickerField } from "@/app/candidate/(layoutwrapper)/profile/(layoutforms)/extracurriculars/_components/DatePickerField";

export const careerInitialValues = {
  interest: null,
  desiredJobType: null,
  startDate: null,
  desiredWorkArea: null,
  experiencesNumber: null,
  experienceYears: null, // 🆕 add this
};

export const CareerFilter: FC = () => {
  const t = useTranslations();
  const { data: interests } = useGetInterestDropdownQuery();
  const { data: positions } = useGetPositionsDropdownQuery();
  const { data: workplace } = useGetWorkDropdownQuery();

  return (
    <>
      <SelectField
        isMulti
        isClearable={false}
        isSearchable
        label={t("companies.talent-pool.filter-interests-label")}
        placeholder={t("common.placeholders.select-field")}
        name="careerExperience.interest"
        options={interests?.data.map(dataToOption)}
      />

      <SelectField
        isMulti
        isClearable={false}
        label={t("companies.talent-pool.filter-positions-label")}
        placeholder={t("common.placeholders.select-field")}
        name="careerExperience.desiredJobType"
        options={positions?.data.map(dataToOption)}
      />

      <div className='pb-6'>
        <DatePickerField
          name="careerExperience.startDate"
          label={t('companies.talent-pool.filter-start-date-label')}
          placeholder="Choose"
          nextDate
          today={true}
        />
      </div>

      <SelectField
        isMulti
        isClearable={false}
        isSearchable
        label={t("companies.talent-pool.filter-workplace-label")}
        placeholder={t("common.placeholders.select-field")}
        name="careerExperience.desiredWorkArea"
        options={workplace?.data.map(dataToOption)}
      />

      <SelectField
        label={t("companies.talent-pool.filter-experiences-count-label")}
        placeholder={t("common.placeholders.select-field")}
        name="careerExperience.experiencesNumber"
        options={Array(6)
          .fill(null)
          .map((v, i) => ({ value: i, label: `${i}` }))}
      />

      <SelectField
        label={"Experience"}
        placeholder={t("common.placeholders.select-field")}
        name="careerExperience.experienceYears"
        options={Array.from({ length: 21 }, (_, i) => ({
          value: i,
          label: `${i}`,
        }))}
      />
    </>
  );
};
