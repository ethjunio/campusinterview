"use client";
import React, { FC, useEffect, useState } from "react";
import { FormikValues } from "formik";
import { useTranslations } from "next-intl";
import { InputField } from "@/components/molecules/form/InputField";
import { TextAreaField } from "@/components/molecules/form/TextAreaField";
import { ListsForm } from "./ListsForm";
import { useGetJobDropdownQuery } from "@/hooks/student/onboardingmgmt/useGetCandidateFormHooks";
import { DatePickerField } from "./DatePickerField";
import { Checkbox } from "@/components/molecules/form/Checkbox";
import { SelectField } from "@/components/molecules/form/SelectField";
import { AddButton, IconButton } from "@/components/atoms/Button";
import { Delete } from "lucide-react";

type Props = {
  newItem: {
    title: string;
    positionTypeId: null;
    location: string;
    description: string;
    flexible: boolean;
    startDate: string;
  };
  values: FormikValues;
  isSubmitting: boolean;
  setFieldValue: (field: string, value: any) => void;
  index: number;
};

export const OpenPositionForm: FC<Props> = ({
  newItem,
  values,
  isSubmitting,
  setFieldValue,
  index,
}) => {
  const t = useTranslations("companies");

  const { data: jobOptions } = useGetJobDropdownQuery();
  const [searchDataJob, setSearchDataJob] = useState<any>([]);

  useEffect(() => {
    if (jobOptions?.data) {
      const searchData = jobOptions?.data?.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setSearchDataJob(searchData);
    }
  }, [jobOptions?.data]);

  // useEffect(() => {
  //   values?.extras?.forEach((item: any, index: number) => {
  //     setFieldValue(`extras.${index}.positionTypeId`, {
  //       value: item?.positionTypeId?.id,
  //       label: item?.positionTypeId?.name,
  //     });
  //   });
  // }, []);
  useEffect(() => {
    values?.extras?.forEach((item: any, idx: number) => {
      if (item?.positionTypeId?.id) {
        setFieldValue(`extras.${idx}.positionTypeId`, item.positionTypeId.id);
      }
    });
  }, [values?.extras, setFieldValue]);
  console.log(values, "VALES");
  return (
    // <ListsForm
    //   isSubmitting={isSubmitting}
    //   name="extras"
    //   addLabel={t("open-positions.add-position-button")}
    //   removeLabel={t("open-positions.remove-label")}
    //   values={values}
    //   newItem={newItem}
    // >
    <div>
      {
        <div className="flex justify-end">
          <IconButton
            tw="rounded lg:ml-12 p-2 lg:self-start self-center justify-center"
            variant="outline"
            onClick={() => {
              const updatedExtras = values.extras.filter(
                (_: any, i: number) => i !== index,
              );
              setFieldValue("extras", updatedExtras);
            }}
            icon={<Delete className="lg:ml-4 h-4 w-4 fill-current" />}
          >
            {t("open-positions.remove-label")}
          </IconButton>
        </div>
      }
      <InputField
        required
        name={`extras.${index}.title`}
        // name="title"
        label={t("open-positions.job-title-label")}
        placeholder={t("open-positions.job-title-placeholder")}
      />

      <SelectField
        required
        name={`extras.${index}.positionTypeId`}
        // name="positionTypeId"
        label={t("open-positions.job-type-label")}
        placeholder={t("open-positions.job-type-placeholder")}
        options={searchDataJob}
      />

      <div className="flex sm:max-w-xs xl:max-w-md justify-between flex-col lg:flex-col gap-1">
        <DatePickerField
          required={!values?.extras?.[index]?.flexible}
          name={`extras.${index}.startDate`}
          // name=""
          label={t("open-positions.job-startDate-label")}
          placeholder={t("open-positions.job-startDate-placeholder")}
          disabled={values?.extras?.[index]?.flexible}
        />
        <Checkbox
          name={`extras.${index}.flexible`}
          // name="flexible"
          label={t("open-positions.flexible")}
          thick
          className="mb-3"
        />
      </div>
      <InputField
        required
        name={`extras.${index}.location`}
        // name="location"
        label={t("open-positions.job-location-label")}
        placeholder={t("open-positions.job-location-placeholder")}
      />
      <TextAreaField
        name={`extras.${index}.description`}
        // name="description"
        label={t("open-positions.job-description-label")}
        placeholder={t("open-positions.job-description-placeholder")}
        rows={5}
        required
      />
      {(index == values?.extras?.length - 1 ||
        values?.extras?.length == 0 ||
        !values?.extras?.length) && (
        <div className="flex justify-center lg:justify-end">
          <AddButton
            disabled={values?.extras?.length >= 10}
            onClick={() => {
              setFieldValue("extras", [...values.extras, { ...newItem }]);
            }}
          >
            {t("open-positions.add-position-button")}
          </AddButton>
        </div>
      )}
    </div>
  );
};
