"use client";
import React, { useEffect, useMemo, useState } from "react";
import { InputField } from "@/components/molecules/form/InputField";
import { TextAreaField } from "@/components/molecules/form/TextAreaField";
import { useTranslations } from "next-intl";
import { Formik, Form } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { DatePickerField } from "../../extracurriculars/_components/DatePickerField";
import { Button } from "@/components/atoms/Button";
import { useCreateCandidateExperienceMutation } from "@/hooks/student/profilemgmt/useCreateCandidateExperienceMutation";
import { useUpdateCandidateExperienceMutation } from "@/hooks/student/profilemgmt/useUpdateCandidateExperienceMutation";
import { useDeleteCandidateExperienceByIdMutation } from "@/hooks/student/profilemgmt/useDeleteCandidateExperienceByIdMutation";
import { toast } from "sonner";
import * as Yup from "yup";
import { SelectField } from "@/components/molecules/form/SelectField";
import { RemoveButton } from "@/components/atoms/Button";
import { fromISOtoDate } from "@/utils/date";
import { usePathname, useRouter } from "next/navigation";
import isEqual from "lodash.isequal";

export const ExperienceForm = ({
  closeModal,
  editableData,
  jobTypes,
  skills = [],
}: {
  closeModal: () => void;
  editableData?: any;
  jobTypes: any;
  skills?: any;
}) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const [hasChanges, setHasChanges] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Job title is required")
      .test(
        "not-only-spaces",
        "Job title cannot be only spaces",
        (value) => !!value?.trim(),
      ),

    employer: Yup.string()
      .required("Employer is required")
      .test(
        "not-only-spaces",
        "Employer cannot be only spaces",
        (value) => !!value?.trim(),
      ),

    jobTypeId: Yup.mixed().required("Position is required"),
    startDate: Yup.date().nullable().required("Start date is required"),
  });

  const AddExperienceFormMutation = useCreateCandidateExperienceMutation();
  const UpdateExperienceFormMutation = useUpdateCandidateExperienceMutation();

  const deleteCandidateExperienceMutation =
    useDeleteCandidateExperienceByIdMutation({
      onSuccess: (success: any) => {
        toast.success(success.message);
        queryClient.invalidateQueries({ queryKey: ["getCandidateExperience"] });
        closeModal();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });

  const originalValues = useMemo(
    () => ({
      title: editableData?.title || "",
      employer: editableData?.employer || "",
      jobTypeId: editableData?.jobType
        ? { label: editableData.jobType.name, value: editableData.jobType.id }
        : null,
      description: editableData?.description || "",
      startDate: fromISOtoDate(editableData?.startDate) || "",
      endDate: fromISOtoDate(editableData?.endDate) || "",
      skillIds: (editableData?.linkedSkills || []).map((s: any) => ({
        value: s.id,
        label: s.name,
      })),
    }),
    [editableData],
  );

  // 2️⃣ normalizeValues
  function normalizeValues(vals: any) {
    return {
      title: vals.title?.trim() ?? "",
      employer: vals.employer?.trim() ?? "",
      jobTypeId: vals.jobTypeId?.value ?? null,
      description: vals.description?.trim() ?? "",
      startDate: vals.startDate ?? "",
      endDate: vals.endDate ?? "",
      skillIds: (vals.skillIds ?? [])
        .map((s: any) => s?.value)
        .filter((v: any) => v != null)
        .sort((a: any, b: any) => a - b),
    };
  }
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
  let formikValues: any = null;
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
      <Formik
        initialValues={originalValues}
        validationSchema={validationSchema}
        onSubmit={async (formData: any) => {
          const sanitizedData = Object.keys(formData).reduce(
            (acc: { [key: string]: any }, key: string) => {
              if (
                // formData[key] !== "" &&
                // formData[key] !== null &&
                formData[key] !== undefined
              ) {
                if (key === "jobTypeId") {
                  acc[key] = formData[key]?.value;
                } else if (key === "skillIds") {
                  acc[key] = (formData[key] ?? [])
                    .map((s: any) => s?.value)
                    .filter((v: any) => v != null);
                } else {
                  acc[key] = formData[key];
                }
              }
              return acc;
            },
            {},
          );

          if (sanitizedData.startDate) {
            sanitizedData.startDate = sanitizedData.startDate
              .split(".")
              .reverse()
              .join("-");
          }

          if (sanitizedData.endDate) {
            sanitizedData.endDate = sanitizedData.endDate
              .split(".")
              .reverse()
              .join("-");
          }

          if (editableData?.id) {
            // ✅ Call Update API

            UpdateExperienceFormMutation.mutate(
              {
                id: editableData.id,
                data: sanitizedData,
              }, // Send ID for update
              {
                onSuccess: (success) => {
                  toast.success(success.message);
                  queryClient.invalidateQueries({
                    queryKey: ["getCandidateExperience"],
                    exact: true,
                  });
                  closeModal();
                },
                onError: (error: any) => {
                  toast.error(error?.response?.data?.message);
                },
              },
            );
          } else {
            // ✅ Call Create API

            AddExperienceFormMutation.mutate(sanitizedData, {
              onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({
                  queryKey: ["getCandidateExperience"],
                  exact: true,
                });
                setHasChanges(false);
                setTimeout(() => {
                  closeModal();
                }, 0);
              },
              onError: (error: any) => {
                toast.error(error?.response?.data?.message);
              },
            });
          }
        }}
      >
        {({ submitCount, errors, values, setFieldValue }) => {
          formikValues = values;
          useEffect(() => {
            const current = normalizeValues(values);
            const original = normalizeValues(originalValues);
            setHasChanges(!isEqual(current, original));
          }, [values, originalValues]);
          return (
            <Form className="vstack vstack-1">
              <InputField
                required
                name="title"
                label={t("candidate.experience.form-jobTitle-label")}
                placeholder={t(
                  "candidate.experience.form-jobTitle-placeholder",
                )}
              />
              <InputField
                required
                name="employer"
                label={t("candidate.experience.form-employer-label")}
                placeholder={t(
                  "candidate.experience.form-employer-placeholder",
                )}
              />

              <SelectField
                required
                name="jobTypeId"
                options={jobTypes}
                label={t("candidate.experience.form-jobType-label")}
                placeholder={t("candidate.experience.form-jobType-placeholder")}
              />

              <div>
                <span>{t("candidate.experience.form-period-label")}*</span>
                <div className="flex flex-col max-w-sm lg:flex-row xl:max-w-md justify-between gap-3 mb-5 relative">
                  <div className="w-full datebox">
                    <DatePickerField
                      required
                      name="startDate"
                      label="Start"
                      placeholder={t(
                        "candidate.experience.form-startDate-placeholder",
                      )}
                      today={true}
                    />
                  </div>

                  <div className="w-full datebox endDate-bax">
                    <DatePickerField
                      name="endDate"
                      label="End"
                      placeholder={t(
                        "candidate.experience.form-endDate-placeholder",
                      )}
                      today={true}
                    />
                  </div>
                </div>
              </div>

              <TextAreaField
                name="description"
                label={t("candidate.experience.form-description-label")}
                placeholder={t(
                  "candidate.experience.form-description-placeholder",
                )}
              />

              <SelectField
                isMulti
                name="skillIds"
                options={skills}
                label={t("candidate.experience.form-skills-label")}
                placeholder={t("candidate.experience.form-skills-placeholder")}
              />

              {submitCount > 0 && Object.keys(errors).length > 0 && (
                <div className="general-text-sm mt-3 text-danger font-medium ">
                  Some required fields are not filled.
                </div>
              )}

              <div className="flex items-center justify-end !mt-4 max-w-full xl:max-w-md">
                {editableData?.id && (
                  <RemoveButton
                    onClick={() =>
                      deleteCandidateExperienceMutation.mutate(editableData?.id)
                    }
                    tw="mr-4"
                  >
                    {t("common.button-remove")}
                  </RemoveButton>
                )}
                <Button type="submit" tw="max-w-xs min-h-0 px-4 rounded">
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
