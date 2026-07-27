"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { InputField } from "@/components/molecules/form/InputField";
import { ImageUploader } from "@/components/molecules/form/ImageUploader";
import { Button } from "@/components/atoms/Button";
import { useCreateCompanyGeneralDataMutation } from "@/hooks/company/onboarding/useCreateCompanyGeneralDataMutation";
import { useGetCompanyGeneralDataQuery } from "@/hooks/company/onboarding/useGetCompanyGeneralDataQuery";
import { useGetIndustriesDropdownQuery } from "@/hooks/student/companymgmt/useGetIndustriesDropdownQuery";
import { toast } from "sonner";
import { TextAreaField } from "@/components/molecules/form/TextAreaField";
import { TagList } from "@/components/molecules/form/TagList";
import { usePathname, useRouter } from "next/navigation";
import isEqual from "lodash.isequal";

export const GeneralForm = ({ button }: { button?: any }) => {
  const router = useRouter();
  const t = useTranslations();
  const [hasChanges, setHasChanges] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const createCompanyGeneralDataMutation =
    useCreateCompanyGeneralDataMutation();
  const { data: IndustryTags } = useGetIndustriesDropdownQuery();
  const { data: companyData } = useGetCompanyGeneralDataQuery();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t("common.form-field-required"))
      .max(100, t("common.form-field-error-max", { max: 100 })),
    description: yup
      .string()
      .trim()
      .required(t("common.form-field-required"))
      .max(500, t("common.form-field-error-max", { max: 500 })),
    industries: yup
      .array()
      .min(1, t("companies.general.form-industry-error-minCount", { min: 1 }))
      .required(t("common.form-field-required"))
      .nullable(),
    website: yup
      .string()
      .required(t("common.form-field-required"))
      .nullable()
      .test(
        "max-length-invalid-url",
        t("companies.general.form-website-error-invalidUrl"),
        function (value) {
          if (!value) return true;

          const urlRegex =
            /^((https?|ftp|smtp):\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i;

          if (value.length > 80 && !urlRegex.test(value)) {
            return false;
          }

          return true;
        }
      )
      .matches(
        /^((https?|ftp|smtp):\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i,
        t("companies.general.form-website-error-invalidUrl")
      ),
  });

  const tags = IndustryTags?.data || [];

  // const initialIndustries = companyData?.CompanyIndustries
  //   ? tags.filter((tag: any) =>
  //       companyData.CompanyIndustries.some(
  //         (ci: any) => ci.industryId === tag.id
  //       )
  //     )
  //   : [];

  const originalValues = useMemo(() => {
    if (!companyData) return null;

    const mappedIndustries = tags.filter((tag: any) =>
      companyData.CompanyIndustries?.some((ci: any) => ci.industryId === tag.id)
    );

    return {
      image: companyData.imageUrlLarge || "",
      name: companyData.name || "",
      description: companyData.description || "",
      industries: mappedIndustries,
      website: companyData.website || "",
    };
  }, [companyData, tags]);

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
  function normalizeValues(values: any) {
    return {
      name: values?.name?.trim() || "",
      description: values?.description?.trim() || "",
      website: values?.website?.trim() || "",
      industries: Array.isArray(values?.industries)
        ? values?.industries.map((i: any) => i.id).sort()
        : [],
      image:
        (values?.image as any) instanceof File
          ? "file"
          : typeof values?.image === "string"
          ? values?.image
          : "",
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
      <Formik
        enableReinitialize={true}
        initialValues={originalValues}
        validationSchema={validationSchema}
        onSubmit={async (values: any) => {
          console.log("Form values:", values);
          const formData = new FormData();
          // Append form values
          formData.append("name", values.name.trim());
          formData.append("description", values.description.trim());
          formData.append(
            "website",
            values.website.startsWith("http")
              ? values.website
              : `https://${values.website}`
          );

          // Convert industries into a JSON string if it's an array
          formData.append(
            "industries",
            Array.isArray(values.industries)
              ? values.industries.map((item: any) => item.id).join(",")
              : ""
          );

          console.log("FormData before submission:", formData);

          // Handle image file separately
          if (values?.image instanceof File) {
            formData.append("image", values.image);
          }

          createCompanyGeneralDataMutation.mutate(formData, {
            onSuccess: () => {
              toast.success("Data saved successfully");
              setHasChanges(false);
              setTimeout(() => {
                if (button !== "save") {
                  router.push("/company/onboarding/contact");
                }
              }, 0);
            },
            onError: (error) => {
              console.error("Error submitting form:", error);
            },
          });
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
              <div className="flex justify-between items-center max-w-full xl:max-w-md">
                <div>
                  <h1>{t("companies.general.title")}</h1>
                </div>
                <div>
                  <Button type="submit" tw="max-w-xs">
                    {button === "save" ? "Save" : "Next Step"}
                  </Button>
                </div>
              </div>
              {submitCount > 0 && Object.keys(errors).length > 0 && (
                <div className="general-text-sm text-danger font-medium ">
                  Some required fields are not filled.
                </div>
              )}
              <div className="h-10"></div>
              <ImageUploader
                name="image"
                maxSize={10}
                label={t("companies.general.form-uploadLogo-button")}
                formatInfo={t("companies.general.form-uploadInfo-format")}
                fileTypeInfo={t("companies.general.form-uploadInfo-type")}
                maxSizeInfo={t("companies.general.form-uploadInfo-maxSize", {
                  size: 10,
                })}
              />

              <div className="mt-16 vstack vstack-0">
                <InputField
                  required
                  name="name"
                  label={t("companies.general.form-name-label")}
                  placeholder={t("companies.general.form-name-placeholder")}
                />

                <TextAreaField
                  className="pb-10"
                  resizeNone
                  name="description"
                  label={t("companies.general.form-description-label")}
                  placeholder={t(
                    "companies.general.form-description-placeholder"
                  )}
                  maxLength={500}
                  hintAlwaysVisible
                  rows={5}
                  required
                />

                <div className="xl:max-w-md">
                  <TagList
                    required
                    tags={tags}
                    name="industries"
                    label={t("companies.general.form-industry-label")}
                    min={1}
                  />
                </div>

                <InputField
                  className="pt-10"
                  required
                  name="website"
                  label={t("companies.general.form-website-label")}
                  placeholder={t("companies.general.form-website-placeholder")}
                />
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
