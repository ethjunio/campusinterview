import React, { FC } from "react";
import { useTranslations } from "next-intl";
import { SelectField } from "@/components/molecules/form/SelectField";
import { dataToOption } from "@/utils/index";
import { useGetResidentialDropdownQuery } from "@/hooks/student/onboardingmgmt/useGetPersonalFormHooks";

export const ResidencePermitInitialValues = [];
export const ResidencePermitFilter: FC = () => {
  const t = useTranslations();
  const { data: residentionOptions } = useGetResidentialDropdownQuery();
  return (
    <>
      <SelectField
        isMulti
        isClearable={false}
        isSearchable
        placeholder={t("common.placeholders.select-field")}
        name="residencePermitIds"
        options={residentionOptions?.data.map(dataToOption)}
      />
    </>
  );
};
