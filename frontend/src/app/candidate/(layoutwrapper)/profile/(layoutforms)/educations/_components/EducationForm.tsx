"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import * as y from "yup";
import { Form, Formik } from "formik";
import { InputField } from "@/components/molecules/form/InputField";
import { Button, RemoveButton } from "@/components/atoms/Button";
import { useAddEducationDetails } from "@/hooks/student/profilemgmt/useCreateEducationDetailsMutation";
import { useUpdateCandidateEducationMutation } from "@/hooks/student/profilemgmt/useUpdateCanditateEducationApi";
import { TagList } from "@/components/molecules/form/TagList";
import { useDeleteCandidateEducationMutation } from "@/hooks/student/profilemgmt/useDeleteCandidateEducationMutation";
import { toast } from "sonner";
import { SelectFieldOther } from "@/components/molecules/form/SelectField";
import { DatePickerField } from "../../extracurriculars/_components/DatePickerField";
import { fromISOtoDate } from "@/utils/date";
import { usePathname, useRouter } from "next/navigation";
import isEqual from "lodash.isequal";

export const EducationForm = ({
  closeModal,
  editableData,
  universities,
  educationLevels,
  majors,
  specializations,
}: {
  closeModal: () => void;
  editableData?: any;
  universities: any;
  educationLevels: any;
  majors: any;
  specializations: any;
}) => {
  const t = useTranslations();
  const router = useRouter();
  const AddEducationalFormMutation = useAddEducationDetails();
  const updateEducationFormMutation = useUpdateCandidateEducationMutation();
  const queryClient = useQueryClient();

  const deleteCandidateEducationMutation = useDeleteCandidateEducationMutation({
    onSuccess: (success: any) => {
      toast.success(success.message);
      queryClient.invalidateQueries({ queryKey: ["getEducationListApi"] });
      closeModal();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const otherValidationOption = (t: any) => ({
    is: (v: any) => v?.label === "Other",
    then: (schema: any) =>
      schema
        .required(t("common.form-field-required"))
        .trim()
        .matches(/^(?!\s*$).+/),
  });

  // 3️⃣ Mirror your initialValues here
  const [hasChanges, setHasChanges] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]);

  const originalValues = useMemo(
    () => ({
      university: editableData?.university
        ? {
            label: editableData.university.name,
            value: editableData.university.id,
          }
        : null,
      educationLevelId: editableData?.educationLevel
        ? [editableData.educationLevel]
        : [],
      major: editableData?.major
        ? { label: editableData.major.name, value: editableData.major.id }
        : null,
      specialization: editableData?.specialization
        ? {
            label: editableData.specialization.name,
            value: editableData.specialization.id,
          }
        : null,
      startDate: editableData?.startDate
        ? fromISOtoDate(editableData.startDate)
        : "",
      endDate: editableData?.endDate ? fromISOtoDate(editableData.endDate) : "",
      averageGrade: editableData?.averageGrade ?? "",
      otherUniversity: editableData?.otherUniversity ?? "",
      otherMajor: editableData?.otherMajor ?? "",
      otherSpecialization: editableData?.otherSpecialization ?? "",
    }),
    [editableData],
  );

  // 4️⃣ Normalize for deep comparison
  function normalizeValues(vals: any) {
    return {
      university: vals.university?.value ?? null,
      educationLevelId: Array.isArray(vals.educationLevelId)
        ? vals.educationLevelId.map((l: any) => l.id).sort()
        : [],
      major: vals.major?.value ?? null,
      specialization: vals.specialization?.value ?? null,
      startDate: vals.startDate ?? "",
      endDate: vals.endDate ?? "",
      averageGrade:
        vals.averageGrade === "" || vals.averageGrade == null
          ? ""
          : Number(vals.averageGrade),
      otherUniversity: vals.otherUniversity?.trim() ?? "",
      otherMajor: vals.otherMajor?.trim() ?? "",
      otherSpecialization: vals.otherSpecialization?.trim() ?? "",
    };
  }

  let formikValues: any = null;
  const pathname = usePathname();
  useEffect(() => {
    if (!originalValues || !formikValues) return;
    const current = normalizeValues(formikValues);
    const original = normalizeValues(originalValues);
    setHasChanges(!isEqual(current, original));
  }, [originalValues, formikValues]);

  useEffect(() => {
    const originalPush = router.push;

    router.push = (path, ...args) => {
      if (hasChanges && typeof path === "string" && path !== pathname) {
        setNextPath(path);
        setShowDialog(true);
        return;
      }
      return originalPush(path, ...args);
    };

    return () => {
      router.push = originalPush;
    };
  }, [hasChanges, pathname]);
  if (!originalValues) return null;
  return (
    <>
      <span className="text-md font-semibold">Study</span>
      <Formik
        enableReinitialize
        initialValues={originalValues}
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

          if (sanitizedData.startDate) {
            sanitizedData.startDate = sanitizedData.startDate
              .split(".")
              .reverse()
              .join("-");
          }

          if (sanitizedData.educationLevelId?.length > 0) {
            sanitizedData.educationLevelId =
              sanitizedData.educationLevelId[0].id;
          }

          if (sanitizedData.endDate) {
            sanitizedData.endDate = sanitizedData.endDate
              .split(".")
              .reverse()
              .join("-");
          }

          // Extract IDs for university, major, and specialization
          if (sanitizedData.university) {
            sanitizedData.universityId = sanitizedData.university.value;
            delete sanitizedData.university;
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

          if (editableData?.id) {
            updateEducationFormMutation.mutate(
              {
                id: editableData.id,
                data: sanitizedData,
              },
              {
                onSuccess: (success) => {
                  queryClient.invalidateQueries({
                    queryKey: ["getEducationListApi"],
                    exact: true,
                  });
                  toast.success(success?.message);
                  setHasChanges(false);

                  setTimeout(() => {
                    closeModal();
                  }, 0);
                },
                onError: (error: any) => {
                  toast.error(error?.response?.data?.message);
                },
              },
            );
          } else {
            AddEducationalFormMutation.mutate(sanitizedData, {
              onSuccess: (success) => {
                queryClient.invalidateQueries({
                  queryKey: ["getEducationListApi"],
                  exact: true,
                });
                toast.success(success?.message);
                closeModal();
              },
              onError: (error: any) => {
                toast.error(error?.response?.data?.message);
              },
            });
          }
        }}
      >
        {({ submitCount, errors, values }) => {
          formikValues = values;
          useEffect(() => {
            const current = normalizeValues(values);
            const original = normalizeValues(originalValues);
            setHasChanges(!isEqual(current, original));
          }, [values, originalValues]);
          return (
            <Form>
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
                    label={t("candidate.education.form-university-other-label")}
                    placeholder={t(
                      "candidate.education.form-university-other-placeholder",
                    )}
                  />
                </SelectFieldOther>
                <div className="max-w-md mb-4">
                  <TagList
                    required
                    tags={educationLevels}
                    name="educationLevelId"
                    label={t("candidate.education.form-educationLevel-label")}
                    min={1}
                    multi={false}
                  />
                </div>

                <div className="flex mb-[2.5rem] sm:max-w-xs xl:max-w-md justify-between flex-col lg:flex-row gap-3">
                  <DatePickerField
                    required
                    name="startDate"
                    label={t("candidate.education.form-studyStartDate-label")}
                    placeholder={t(
                      "candidate.education.form-studyStartDate-placeholder",
                    )}
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
                  placeholder={t("candidate.education.form-major-placeholder")}
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
              {submitCount > 0 && Object.keys(errors).length > 0 && (
                <div className="general-text-sm mt-3 text-danger font-medium ">
                  Some required fields are not filled.
                </div>
              )}
              <div className="flex items-center justify-end !mt-4 max-w-full xl:max-w-md">
                {editableData?.id && (
                  <RemoveButton
                    onClick={() =>
                      deleteCandidateEducationMutation.mutate(editableData?.id)
                    }
                    tw="mr-4"
                  >
                    {t("common.button-remove")}
                  </RemoveButton>
                )}
                <Button type="submit" tw="max-w-xs  min-h-0 px-4 rounded">
                  Save
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      {showDialog && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <p className="text-lg font-medium mb-4">
              You have unsaved changes. Are you sure you want to leave this
              page?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Stay
              </button>
              <button
                onClick={() => {
                  setShowDialog(false);
                  setHasChanges(false);
                  setTimeout(() => {
                    if (nextPath) router.push(nextPath); // Delay to allow state to update
                  }, 0);
                }}
                className="px-4 py-2 text-sm bg-red text-white rounded hover:bg-red-600"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
