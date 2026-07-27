import React, { useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import { InputField } from "@/components/molecules/form/InputField";
import { Button, RemoveButton } from "@/components/atoms/Button";
import * as y from "yup";
import { useCreateThesisMutation } from "@/hooks/student/profilemgmt/useCreateThesisApi";
import { useUpdateThesisMutation } from "@/hooks/student/profilemgmt/useUpdateThesisApi";
import { useTranslations } from "next-intl";
import { SelectField } from "@/components/molecules/form/SelectField";
import { TextAreaField } from "@/components/molecules/form/TextAreaField";
import { useDeleteCandidateEducationThesisByIdMutation } from "@/hooks/student/profilemgmt/useDeleteCandidateEducationThesisByIdMutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { DatePickerField } from "../../extracurriculars/_components/DatePickerField";
import { fromISOtoDate } from "@/utils/date";
import isEqual from "lodash.isequal";
import { usePathname, useRouter } from "next/navigation";

const ThesisModal = ({
  closeModal,
  data,
  types,
}: {
  isOpen: boolean;
  closeModal: () => void;
  data: any;
  types: any;
}) => {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();
  const thesisMutation = useCreateThesisMutation({
    onSuccess: (success: any) => {
      toast.success(success.message);
      queryClient.invalidateQueries({ queryKey: ["getEducationListApi"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const maxString = (t: any, value = 255) => {
    return y
      .string()
      .max(value, t("common.form-field-error-max", { max: value }))
      .nullable();
  };

  const maxStringAndRequired = (t: any, value = 255) => {
    return y
      .string()
      .max(value, t("common.form-field-error-max", { max: value }))
      .required(t("common.form-field-required"))
      .trim()
      .matches(/^(?!\s*$).+/)
      .nullable();
  };

  const updateThesisMutation = useUpdateThesisMutation({
    onSuccess: (success: any) => {
      toast.success(success.message);
      queryClient.invalidateQueries({ queryKey: ["getEducationListApi"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const deleteCandidateEducationThesisByIdMutation =
    useDeleteCandidateEducationThesisByIdMutation({
      onSuccess: (success: any) => {
        toast.success(success.message);
        queryClient.invalidateQueries({ queryKey: ["getEducationListApi"] });
        closeModal();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });

  let formikValues: any = null;
  const pathname = usePathname();
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
      title: data?.title || "",
      type: data?.type ? { label: data.type.name, value: data.type.id } : null,
      description: data?.description || "",
      grade: data?.grade ?? "",
      startDate: fromISOtoDate(data?.startDate) || "",
    }),
    [data],
  );

  function normalizeValues(vals: any) {
    return {
      title: vals.title?.trim() ?? "",
      type: vals.type?.value ?? null,
      description: vals.description?.trim() ?? "",
      grade: vals.grade === "" || vals.grade == null ? "" : Number(vals.grade),
      startDate: vals.startDate ?? "",
    };
  }

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

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!originalValues) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between flex-col gap-4 mt-4">
          <div className="flex justify-between">
            {" "}
            <h1>Thesis</h1>
            <button
              className=" text-[18px] text-[#1968ff] font"
              onClick={closeModal}
            >
              X
            </button>
          </div>
          <div></div>
          <Formik
            enableReinitialize
            initialValues={originalValues}
            onSubmit={async (formData: any) => {
              let submitData;
              if (data?.id) {
                submitData = {
                  title: formData.title,
                  typeId: formData.type.value,
                  description: formData.description,
                  startDate: formData?.startDate
                    ? formData.startDate.split(".").reverse().join("-")
                    : "",
                  grade: formData.grade == "" ? null : formData.grade,
                };
              } else {
                submitData = {
                  title: formData.title,
                  typeId: formData.type.value,
                  description: formData.description,
                  startDate: formData.startDate,
                  grade: formData.grade == "" ? null : formData.grade,
                  educationId: data,
                };
              }

              if (data?.id) {
                updateThesisMutation.mutate({ id: data.id, data: submitData });
              } else {
                thesisMutation.mutate(submitData);
              }
              setHasChanges(false);
              setTimeout(() => {
                closeModal();
              }, 0);
            }}
            validationSchema={y.object().shape({
              title: maxStringAndRequired(t, 200),
              type: y
                .object()
                .nullable()
                .required(t("common.form-field-required")),
              startDate: y
                .string()
                .required(t("common.form-field-required"))
                .nullable(),
              grade: y
                .number()
                .min(1, t("common.form-field-error-min", { min: 1 }))
                .max(6, t("common.form-field-error-max", { max: 6 }))
                .nullable(),
              description: maxString(t, 550),
            })}
          >
            {({ submitCount, errors, values, setFieldValue }) => {
              formikValues = values;

              // 2) on every change, compare to originalValues
              useEffect(() => {
                const current = normalizeValues(values);
                const original = normalizeValues(originalValues);
                setHasChanges(!isEqual(current, original));
              }, [values, originalValues]);

              return (
                <Form className="vstack vstack-4">
                  <InputField
                    required
                    name="title"
                    maxLength={200}
                    label={t("candidate.education.thesis.form-title-label")}
                    placeholder={t(
                      "candidate.education.thesis.form-title-placeholder",
                    )}
                  />

                  <SelectField
                    required
                    name="type"
                    options={types}
                    label={t("candidate.education.thesis.form-type-label")}
                    placeholder={t(
                      "candidate.education.thesis.form-type-placeholder",
                    )}
                  />

                  <InputField
                    type="number"
                    step={0.01}
                    min={0}
                    max={6}
                    name="grade"
                    label={t("candidate.education.thesis.form-grade-label")}
                    placeholder={t(
                      "candidate.education.thesis.form-grade-placeholder",
                    )}
                  />

                  <div className="block max-w-full xl:max-w-md mb-6">
                    <DatePickerField
                      required
                      name="startDate"
                      label={t(
                        "candidate.education.thesis.form-startDate-label",
                      )}
                      placeholder={t(
                        "candidate.education.thesis.form-startDate-placeholder",
                      )}
                      today={true}
                    />
                  </div>

                  <TextAreaField
                    name="description"
                    label={t(
                      "candidate.education.thesis.form-description-label",
                    )}
                    placeholder={t(
                      "candidate.education.thesis.form-description-placeholder",
                    )}
                    className=" p-2 relative"
                  />

                  {submitCount > 0 && Object.keys(errors).length > 0 && (
                    <div className="general-text-sm mt-3 text-danger font-medium ">
                      Some required fields are not filled.
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-4">
                    {data?.id && (
                      <RemoveButton
                        onClick={() =>
                          deleteCandidateEducationThesisByIdMutation.mutate(
                            data?.id,
                          )
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
        </div>
      </div>
    </div>
  );
};

export default ThesisModal;
