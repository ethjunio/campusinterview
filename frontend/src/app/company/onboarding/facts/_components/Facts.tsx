"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Form, Formik } from "formik";
import { InputField } from "@/components/molecules/form/InputField";
import { Button } from "@/components/atoms/Button";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateCompanyFactsFiguresDataMutation } from "@/hooks/company/onboarding/useCreateCompanyFactsFiguresDataMutation";
import { useGetCompanyGeneralDataQuery } from "@/hooks/company/onboarding/useGetCompanyGeneralDataQuery";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import * as yup from "yup";
import { Info } from "lucide-react";

const ReactMde = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export const Facts = (button: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("companies");
  const createFactsFiguresMutation = useCreateCompanyFactsFiguresDataMutation();
  const [visibleTooltip, setVisibleTooltip] = useState<
    "corporateActivity" | "philosophy" | null
  >(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [initialValuesSnapshot, setInitialValuesSnapshot] =
    useState<string>("");
  const [hasChanges, setHasChanges] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const showTooltip = (field: "corporateActivity" | "philosophy") =>
    setVisibleTooltip(field);
  const hideTooltip = () => setVisibleTooltip(null);

  // Click outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        hideTooltip();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data } = useGetCompanyGeneralDataQuery() as {
    data: {
      philosophy: string;
      corporateActivity: string;
      swissOfficeLocation?: string;
      headquarterLocation?: string;
      swissEmployeeCount?: number;
      worldEmployeeCount?: number;
      shareOfGraduates?: number;
    };
  };

  const initialValues = useMemo(
    () => ({
      corporateActivity: data?.corporateActivity || "",
      philosophy: data?.philosophy || "",
      swissOfficeLocation: data?.swissOfficeLocation || "",
      headquarterLocation: data?.headquarterLocation || "",
      swissEmployeeCount: data?.swissEmployeeCount ?? null,
      worldEmployeeCount: data?.worldEmployeeCount ?? null,
      shareOfGraduates: data?.shareOfGraduates ?? null,
    }),
    [data]
  );

  useEffect(() => {
    setInitialValuesSnapshot(JSON.stringify(initialValues));
  }, [initialValues]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

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

  // ✅ Memoized options (stable reference, no remounting)
  const mdeOptions = useMemo(
    () => ({
      minHeight: "16rem",
      maxHeight: "16rem",
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
      autoFocus: false,
      spellChecker: false,
      previewClass: ["no-preview"],
      status: false,
    }),
    []
  );

  const Tooltip = ({ text }: { text: string }) => (
    <div
      ref={tooltipRef}
      className="absolute z-10 text-sm text-gray-600 p-3 bg-white rounded-md shadow-lg border border-gray-200 w-64"
      style={{ top: "-5px", left: "110%" }}
    >
      <p className="font-medium mb-1">{text}</p>
    </div>
  );

  const validationSchema = yup.object().shape({
    shareOfGraduates: yup
      .number()
      .nullable()
      .typeError("Share of graduates must be a number")
      .min(0, "Share of graduates cannot be less than 0%")
      .max(100, "Share of graduates cannot exceed 100%"),
    swissEmployeeCount: yup
      .number()
      .nullable()
      .typeError("Employees in Switzerland count must be a number")
      .min(0, "Employees in Switzerland count cannot be negative"),
    worldEmployeeCount: yup
      .number()
      .nullable()
      .typeError("Employees worldwide count must be a number")
      .min(0, "Employees worldwide count cannot be negative"),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={async (formData: any) => {
          const normalizedData = {
            ...formData,
            corporateActivity:
              formData.corporateActivity === ""
                ? null
                : formData.corporateActivity,
            philosophy: formData.philosophy === "" ? null : formData.philosophy,
            swissEmployeeCount:
              formData.swissEmployeeCount === ""
                ? null
                : Number(formData.swissEmployeeCount),
            worldEmployeeCount:
              formData.worldEmployeeCount === ""
                ? null
                : Number(formData.worldEmployeeCount),
          };

          createFactsFiguresMutation.mutate(normalizedData, {
            onSuccess: () => {
              toast.success("Data saved successfully");
              setHasChanges(false);
              setTimeout(() => {
                if (button.button !== "save") {
                  router.push("/company/onboarding/joinus");
                }
              }, 0);
            },
            onError: () => {
              toast.error("Error in saving data");
            },
          });
        }}
        validationSchema={validationSchema}
      >
        {({ submitCount, errors, values, setFieldValue }) => {
          useEffect(() => {
            if (initialValuesSnapshot) {
              setHasChanges(JSON.stringify(values) !== initialValuesSnapshot);
            }
          }, [values, initialValuesSnapshot]);

          return (
            <Form>
              <div className="flex justify-between items-center max-w-full xl:max-w-md">
                <div>
                  <h1 className="">{t("facts.title")}</h1>
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
                <div className="general-text-sm text-danger font-medium">
                  Some required fields are not filled.
                </div>
              )}

              <div className="h-10"></div>

              {/* Corporate Activity */}
              <div className="block max-w-full xl:max-w-md mb-9">
                <label className="block mb-1">
                  <div className="flex items-center gap-x-1">
                    {t("facts.form-activity-label")}
                    <div className="relative">
                      <button
                        type="button"
                        onMouseEnter={() => showTooltip("corporateActivity")}
                        onMouseLeave={hideTooltip}
                        onFocus={() => showTooltip("corporateActivity")}
                        onBlur={hideTooltip}
                        className="text-gray-500 hover:text-primary-dark focus:outline-none"
                        aria-label="Corporate activity suggestions"
                      >
                        <Info size={16} />
                      </button>
                      {visibleTooltip === "corporateActivity" && (
                        <Tooltip text="Describe your company’s main operations, services, or areas of expertise." />
                      )}
                    </div>
                  </div>
                </label>
                <ReactMde
                  value={values.corporateActivity}
                  onChange={(v) => setFieldValue("corporateActivity", v)}
                  options={mdeOptions} // ✅ stable options
                />
              </div>

              {/* Philosophy */}
              <div className="block max-w-full xl:max-w-md mb-9">
                <label className="block mb-1">
                  <div className="flex items-center gap-x-1">
                    {t("facts.form-philosophy-label")}
                    <div className="relative">
                      <button
                        type="button"
                        onMouseEnter={() => showTooltip("philosophy")}
                        onMouseLeave={hideTooltip}
                        onFocus={() => showTooltip("philosophy")}
                        onBlur={hideTooltip}
                        className="text-gray-500 hover:text-primary-dark focus:outline-none"
                        aria-label="Philosophy suggestions"
                      >
                        <Info size={16} />
                      </button>
                      {visibleTooltip === "philosophy" && (
                        <Tooltip text="Explain your core values, mission, or guiding principles as a company." />
                      )}
                    </div>
                  </div>
                </label>
                <ReactMde
                  value={values.philosophy}
                  onChange={(value) => setFieldValue("philosophy", value)}
                  options={mdeOptions} // ✅ stable options
                />
              </div>

              {/* Other Input Fields */}
              <InputField
                name="swissOfficeLocation"
                label={t("facts.form-locationSwiss-label")}
                placeholder={t("facts.form-locationSwiss-placeholder")}
              />

              <InputField
                name="headquarterLocation"
                label={t("facts.form-locationHeadquarters-label")}
                placeholder={t("facts.form-locationHeadquarters-placeholder")}
              />

              <InputField
                type="number"
                name="swissEmployeeCount"
                label={t("facts.form-employeesSwiss-label")}
                placeholder={t("facts.form-employeesSwiss-placeholder")}
              />

              <InputField
                type="number"
                name="worldEmployeeCount"
                label={t("facts.form-employeesWorldwide-label")}
                placeholder={t("facts.form-employeesWorldwide-placeholder")}
              />

              <InputField
                name="shareOfGraduates"
                label={t("facts.form-gradShare-label")}
                placeholder={t("facts.form-gradShare-placeholder")}
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
