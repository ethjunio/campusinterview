"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import * as y from "yup";
import { Form, Formik } from "formik";
import { InputField } from "@/components/molecules/form/InputField";
import { Button } from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import { useEducationFormCreateMutation } from "@/hooks/student/onboardingmgmt/useEducationFormCreateMutation";
import {
  useGetMajorsDropdownQuery,
  useGetSpecializationDropdownQuery,
  useGetUniversityDropdownQuery,
} from "@/hooks/student/onboardingmgmt/useGetEducationalFormHooks";
import { useGetEducationDataQuery } from "@/hooks/student/onboardingmgmt/useGetEducationDataQuery";
import { TagList } from "@/components/molecules/form/TagList";
import { useGetEducationLevelQuery } from "@/hooks/student/onboardingmgmt/useGetEducationLevelQuery";
import { toast } from "sonner";
import { DatePickerField } from "@/app/candidate/(layoutwrapper)/profile/(layoutforms)/extracurriculars/_components/DatePickerField";
import { SelectFieldOther } from "@/components/molecules/form/SelectField";
import { dataToOption } from "@/utils";
import { fromISOtoDate } from "@/utils/date";

export const EducationForm = () => {
  const router = useRouter();

  const t = useTranslations();

  const createEducationalFormMutation = useEducationFormCreateMutation();

  const { data: UniversityOptions } = useGetUniversityDropdownQuery();
  const { data: MajorsOptions } = useGetMajorsDropdownQuery();
  const { data: SpecializationOptions } = useGetSpecializationDropdownQuery();
  const { data: EducationData } = useGetEducationDataQuery();
  const { data: EducationLevels, isLoading } = useGetEducationLevelQuery();

  const universities = UniversityOptions?.data.map(dataToOption);
  const specializations = SpecializationOptions?.data.map(dataToOption);
  const majors = MajorsOptions?.data.map(dataToOption);
  const educationLevels = EducationLevels?.data;

  const otherValidationOption = (t: any) => ({
    is: (v: any) => v?.label === "Other",
    then: (schema: any) =>
      schema
        .required(t("common.form-field-required"))
        .trim()
        .matches(/^(?!\s*$).+/),
  });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          university: EducationData?.data?.university
            ? {
                label: EducationData?.data?.university?.name,
                value: EducationData?.data?.university?.id,
              }
            : null,
          educationLevelId: EducationData?.data?.educationLevel
            ? [EducationData?.data?.educationLevel]
            : [],
          major: EducationData?.data?.major
            ? {
                label: EducationData?.data?.major?.name,
                value: EducationData?.data?.major?.id,
              }
            : null,
          specialization: EducationData?.data?.specialization
            ? {
                label: EducationData?.data?.specialization?.name,
                value: EducationData?.data?.specialization?.id,
              }
            : null,
          startDate: EducationData?.data?.startDate
            ? fromISOtoDate(EducationData?.data.startDate)
            : "",
          endDate: EducationData?.data?.endDate
            ? fromISOtoDate(EducationData?.data.endDate)
            : "",
          averageGrade: EducationData?.data?.averageGrade || null,
          otherUniversity: EducationData?.data?.otherUniversity || "",
          otherMajor: EducationData?.data?.otherMajor || "",
          otherSpecialization: EducationData?.data?.otherSpecialization || "",
        }}
        onSubmit={async (formData: any) => {
          const sanitizedData = Object.keys(formData).reduce(
            (acc: { [key: string]: any }, key: string) => {
              if (
                // formData[key] !== "" &&
                // formData[key] !== null &&
                formData[key] !== undefined
              ) {
                acc[key] = formData[key];
              }
              return acc;
            },
            {},
          );
          if (sanitizedData.averageGrade === "")
            sanitizedData.averageGrade = null;

          const formatDate = (date: string | Date) => {
            if (!date) return null;
            const parsedDate = new Date(date);
            return isNaN(parsedDate.getTime())
              ? null
              : parsedDate.toISOString().split("T")[0];
          };

          sanitizedData.startDate = formatDate(sanitizedData.startDate);
          sanitizedData.endDate = formatDate(sanitizedData.endDate);

          // Extract IDs for university, major, and specialization
          if (sanitizedData.university) {
            sanitizedData.universityId = sanitizedData.university.value;
            delete sanitizedData.university;
          }

          if (sanitizedData.educationLevelId?.length > 0) {
            sanitizedData.educationLevelId =
              sanitizedData.educationLevelId[0].id;
          }

          if (sanitizedData.major) {
            sanitizedData.fieldOfStudyId = sanitizedData.major.value;
            delete sanitizedData.major;
          }

          if (sanitizedData.specialization) {
            sanitizedData.specializationId = sanitizedData.specialization.value;
            delete sanitizedData.specialization;
          } else {
            sanitizedData.specializationId = null;
            delete sanitizedData.specialization;
          }

          createEducationalFormMutation.mutate(sanitizedData, {
            onSuccess: (data) => {
              // Redirect on successful submission
              toast.success(data?.message);
              router.push("/candidate/onboarding/experiences");
            },
            onError: (error: any) => {
              toast.error(error?.response?.data?.message);
            },
          });
        }}
        validationSchema={y.object().shape({
          startDate: y.string().required(t("common.form-field-required")),
          endDate: y.string().nullable(),
          university: y
            .object()
            .nullable()
            .required(t("common.form-field-required")),
          otherUniversity: y
            .string()
            .when("university", otherValidationOption(t)),
          major: y
            .object()
            .nullable()
            .required(t("common.form-field-required")),
          otherMajor: y.string().when("major", otherValidationOption(t)),
          otherSpecialization: y
            .string()
            .when("specialization", otherValidationOption(t)),
          educationLevelId: y
            .array()
            .min(1, "Required")
            .required(t("common.form-field-required"))
            .nullable(),
        })}
      >
        {({ submitCount, errors }) => (
          <Form>
            <div className="flex justify-between align-baseline max-w-full xl:max-w-md">
              <div>
                <h3>Education</h3>
              </div>
              <Button type="submit" tw="max-w-xs">
                Next Step
              </Button>
            </div>
            {submitCount > 0 && Object.keys(errors).length > 0 && (
              <div className="general-text-sm text-danger font-medium ">
                Some required fields are not filled.
              </div>
            )}
            {!isLoading && (
              <>
                <div className="mt-4 vstack vstack-0">
                  <SelectFieldOther
                    required
                    options={universities}
                    name="university"
                    label={t("candidate.education.form-university-label")}
                    placeholder={t(
                      "candidate.education.form-university-placeholder",
                    )}
                  >
                    <InputField
                      required
                      name="otherUniversity"
                      label={t(
                        "candidate.education.form-university-other-label",
                      )}
                      placeholder={t(
                        "candidate.education.form-university-other-placeholder",
                      )}
                    />
                  </SelectFieldOther>
                  <div className="max-w-md">
                    <TagList
                      required
                      tags={educationLevels}
                      name="educationLevelId"
                      label={t("candidate.education.form-educationLevel-label")}
                      min={1}
                      multi={false}
                    />
                  </div>

                  <div className="flex mb-9 pt-4 sm:max-w-xs xl:max-w-md justify-between flex-col lg:flex-row gap-3">
                    <DatePickerField
                      required
                      name="startDate"
                      label={t("candidate.education.form-studyStartDate-label")}
                      placeholder={t(
                        "candidate.education.form-studyStartDate-placeholder",
                      )}
                      prevDate
                      today={true}
                    />

                    <DatePickerField
                      name="endDate"
                      label={t("candidate.education.form-studyEndDate-label")}
                      placeholder={t(
                        "candidate.education.form-studyEndDate-placeholder",
                      )}
                      today={true}
                    />
                  </div>

                  <SelectFieldOther
                    required
                    isSearchable
                    isClearable={true}
                    options={majors}
                    name="major"
                    label={t("candidate.education.form-major-label")}
                    placeholder={t(
                      "candidate.education.form-major-placeholder",
                    )}
                  >
                    <InputField
                      required
                      name="otherMajor"
                      label={t("candidate.education.form-major-other-label")}
                      placeholder={t(
                        "candidate.education.form-major-other-placeholder",
                      )}
                    />
                  </SelectFieldOther>
                  <SelectFieldOther
                    options={specializations}
                    name="specialization"
                    label={t("candidate.education.form-specialization-label")}
                    placeholder={t(
                      "candidate.education.form-specialization-placeholder",
                    )}
                  >
                    <InputField
                      required
                      name="otherSpecialization"
                      label={t(
                        "candidate.education.form-specialization-other-label",
                      )}
                      placeholder={t(
                        "candidate.education.form-specialization-placeholder",
                      )}
                    />
                  </SelectFieldOther>

                  <InputField
                    name="averageGrade"
                    label="Average grade"
                    placeholder={t(
                      "candidate.education.form-averageGrade-placeholder",
                    )}
                    type="number"
                    min={0}
                    max={6}
                    step={0.01}
                  />
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
