"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Form, Formik } from "formik";
import { InputField } from "@/components/molecules/form/InputField";
import { Button } from "@/components/atoms/Button";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { SelectField } from "@/components/molecules/form/SelectField";
import { TagList } from "@/components/molecules/form/TagList";
import { useGetMajorsDropdownQuery } from "@/hooks/student/onboardingmgmt/useGetEducationalFormHooks";
import { useGetPositionsDropdownQuery } from "@/hooks/student/profilemgmt/useGetPositionsDropdownQuery";
import { useCreateCompanywhyJoinUsDataMutation } from "@/hooks/company/onboarding/useCreateCompanywhyJoinUsDataMutation";
import { useGetCompanyGeneralDataQuery } from "@/hooks/company/onboarding/useGetCompanyGeneralDataQuery";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useGetLanguageDropdownQuery } from "@/hooks/student/profilemgmt/useGetLanguageDropdownQuery";
import isEqual from "lodash.isequal";

const ReactMde = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export const Joinus = (button: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("companies");
  const createJoinusMutation = useCreateCompanywhyJoinUsDataMutation();
  const { data: LanguageOption } = useGetLanguageDropdownQuery();
  const { data } = useGetCompanyGeneralDataQuery() as any;

  const { data: offeredData } = useGetPositionsDropdownQuery();
  const { data: fieldsData } = useGetMajorsDropdownQuery();

  const [initialData, setInitialData] = useState<string>("");
  const [hasChanges, setHasChanges] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const mdeOptions = useMemo(
    () => ({
      minHeight: "50px",
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
        "|",
        {
          name: "guide",
          action: () =>
            window.open("https://simplemde.com/markdown-guide", "_blank"),
          className: "fa fa-question-circle",
          title: "Markdown Guide",
        } as any,
      ],
      // Add this to prevent auto-focus issues
      autoFocus: false,
      spellChecker: false,
      previewClass: ["no-preview"], // This hides the preview
      status: false, // This hides the status bar
      sideBySideFullscreen: false, // Disable side-by-side view
    }),
    []
  );

  function dataToOption(data: any) {
    if (data) {
      const { id: value, name: label } = data;
      return { value, label };
    }
    return null;
  }
  function dataToOption2(data: any) {
    if (data) {
      const { code: value, name: label } = data;
      return { value, label };
    }
    return null;
  }

  const offered = offeredData?.data || [];
  const fields = fieldsData?.data.map(dataToOption) || [];
  const langs = LanguageOption?.data?.map(dataToOption2) || [];

  const originalValues = useMemo(() => {
    if (!data) return null;

    return {
      fieldsOfStudy:
        data?.fieldsOfStudy?.map((item: any) => ({
          label: item.name,
          value: item.id,
        })) || [],
      lookingFor: data?.lookingFor || "",
      culture: data?.culture || "",
      weOffer: data?.weOffer || "",
      offeredPositionTypes: data?.offeredPositionTypes || [],
      startingSalary: data?.startingSalary || "",
      mainLanguage: data?.Language
        ? { value: data.Language.code, label: data.Language.name }
        : null,
    };
  }, [data]);
  const normalizeValues = (vals: any) => ({
    fieldsOfStudy: vals.fieldsOfStudy.map((f: any) => f.value).sort(),
    lookingFor: (vals.lookingFor || "").trim(),
    culture: (vals.culture || "").trim(),
    weOffer: (vals.weOffer || "").trim(),
    offeredPositionTypes: vals.offeredPositionTypes.slice().sort(),
    startingSalary: vals.startingSalary,
    mainLanguage: vals.mainLanguage?.value || "",
  });

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
        enableReinitialize={true}
        initialValues={originalValues}
        onSubmit={async (formData: any) => {
          console.log("formData", formData);
          const newData = {
            fieldsOfStudy: formData.fieldsOfStudy.map((item: any) => {
              return {
                name: item.label,
                id: item.value,
              };
            }),
            lookingFor: formData.lookingFor,
            culture: formData.culture,
            weOffer: formData.weOffer,
            offeredPositionTypes: formData.offeredPositionTypes,
            startingSalary: formData.startingSalary,
            mainLanguage: formData.mainLanguage?.value,
          };

          // Call the mutation with FormData payload

          createJoinusMutation.mutate(newData, {
            onSuccess: (data) => {
              toast.success("Data saved successfully");
              setHasChanges(false);
              setTimeout(() => {
                {
                  button.button === "save"
                    ? null
                    : router.push("/company/onboarding/participants");
                }
              }, 0);
            },
            onError: (error) => {
              console.error("Error submitting form:", error);
            },
          });
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
            <Form className="vstack vstack-0">
              <div className="flex justify-between items-center max-w-full xl:max-w-md">
                <div>
                  <h1>{t("joinus.title")}</h1>
                </div>
                <div>
                  {button.button === "save" ? (
                    <Button type="submit" tw="max-w-xs">
                      Save
                    </Button>
                  ) : (
                    <Button type="submit" tw="max-w-xs">
                      Next Step
                    </Button>
                  )}
                </div>
              </div>

              {submitCount > 0 && Object.keys(errors).length > 0 && (
                <div className="general-text-sm text-danger font-medium ">
                  Some required fields are not filled.
                </div>
              )}
              <div className="h-10"></div>
              <SelectField
                isClearable={false}
                isMulti
                isSearchable
                label={t("joinus.form-majors-label")}
                name="fieldsOfStudy"
                options={fields}
                shouldSort
              />

              <div className="block max-w-full xl:max-w-md mb-9">
                <label className="block mb-1">
                  {t("joinus.form-lookingFor-label")}
                </label>

                <ReactMde
                  value={values.lookingFor}
                  onChange={(v) => setFieldValue("lookingFor", v)}
                  options={{
                    ...mdeOptions,
                    minHeight: "16rem", // fixed min height (like h-64)
                    maxHeight: "16rem", // 👈 cap max height
                    spellChecker: false, // optional
                  }}
                />
              </div>

              <div className="block max-w-full xl:max-w-md mb-9">
                <label className="block mb-1">
                  {t("joinus.form-companyCulture-label")}
                </label>
                <ReactMde
                  value={values.culture}
                  onChange={(value) => setFieldValue("culture", value)}
                  options={{
                    ...mdeOptions,
                    minHeight: "16rem", // fixed min height (like h-64)
                    maxHeight: "16rem", // 👈 cap max height
                    spellChecker: false, // optional
                  }}
                />
              </div>

              <div className="block max-w-full xl:max-w-md mb-9">
                <label className="block mb-1">
                  {t("joinus.form-weOffer-label")}
                </label>
                <ReactMde
                  value={values.weOffer}
                  onChange={(value) => setFieldValue("weOffer", value)}
                  options={{
                    ...mdeOptions,
                    minHeight: "16rem", // fixed min height (like h-64)
                    maxHeight: "16rem", // 👈 cap max height
                    spellChecker: false, // optional
                  }}
                />
              </div>

              <TagList
                min={1}
                name="offeredPositionTypes"
                label={t("joinus.form-positions-label")}
                tags={offered}
              />

              <InputField
                className="pt-3"
                name="startingSalary"
                label={t("joinus.form-salary-label")}
                placeholder={t("joinus.form-salary-placeholder")}
              />

              <SelectField
                name="mainLanguage"
                label={t("joinus.form-mainLanguage-label")}
                placeholder={t("joinus.form-mainLanguage-placeholder")}
                options={langs}
                isSearchable
              />
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
                    if (nextPath) router.push(nextPath);
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
