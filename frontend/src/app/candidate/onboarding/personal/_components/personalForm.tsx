"use client";
import { DatePickerField } from "@/app/candidate/(layoutwrapper)/profile/(layoutforms)/extracurriculars/_components/DatePickerField";
import { Button } from "@/components/atoms/Button";
import { ImageUploader } from "@/components/molecules/form/ImageUploader";
import { InputField } from "@/components/molecules/form/InputField";
import { useGetPersonalDataQuery } from "@/hooks/student/onboardingmgmt/useGetPersonalDataQuery";
import {
  useGetNationalityDropdownQuery,
  useGetResidentialDropdownQuery,
} from "@/hooks/student/onboardingmgmt/useGetPersonalFormHooks";
import { usePersonalFormCreateMutation } from "@/hooks/student/onboardingmgmt/usePersonalFormCreateMutation";
import { fromISOtoDate } from "@/utils/date";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import isEqual from "lodash.isequal";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PhoneInput, { getCountryCallingCode, parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";
import { toast } from "sonner";
import * as yup from "yup";

export const PersonalForm = (button: any) => {
  const queryClient = useQueryClient();
  const [isSearchable, setIsSearchable] = useState(false);
  const router = useRouter();
  const t = useTranslations();
  const createPersonalFormMutation = usePersonalFormCreateMutation();
  const [searchData, setSearchData] = useState<any>([]);
  const [searchDataResidencial, setSearchDataResidencial] = useState<any>([]);
  const { data: options } = useGetNationalityDropdownQuery();
  const { data: residentionOptions } = useGetResidentialDropdownQuery();
  const { data: personalData } = useGetPersonalDataQuery();
  const [hasChanges, setHasChanges] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [eventInterviewDate, setEventInterviewDate] = useState<string | null>(null);

  const phoneRegExp =
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

  useEffect(() => {
    if (residentionOptions?.data) {
      const searchData = residentionOptions?.data?.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));
      setSearchDataResidencial(searchData);
    }
  }, [residentionOptions?.data]);

  useEffect(() => {
    if (options?.data) {
      const searchData = options?.data?.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));
      setSearchData(searchData);
    }
  }, [options?.data]);

  const onSearchChange = (selectedOption: any, setFieldValue: any) => {
    setFieldValue("nationalityId", selectedOption?.value || 0);
  };

  const onSearchChangeResidential = (
    selectedOption: any,
    setFieldValue: any
  ) => {
    setFieldValue("residencePermitId", selectedOption?.value || 0);
  };

  const handleExperienceChange = (selectedOption: any, setFieldValue: any) => {
    const value = selectedOption ? selectedOption.value : null;
    setFieldValue("experienceYears", value);
  };

  const handleSalutationChange = (selectedOption: any, setFieldValue: any) => {
    setFieldValue("salutation", selectedOption ? selectedOption : null);
  };

  const validationSchema = yup.object().shape({
    salutation: yup
      .object({
        value: yup.string().oneOf(["Mr.", "Dr.", "Mx.", "Ms.", "Prof", "None"]),
        label: yup.string(),
      })
      .required("Required")
      .default(null),
    firstName: yup
      .string()
      .required(t("common.form-field-required"))
      .test(
        "not-only-spaces",
        "First name cannot be only spaces",
        (value) => !!value?.trim()
      )
      .max(50, t("common.form-field-error-max", { max: 50 })),

    lastName: yup
      .string()
      .required(t("common.form-field-required"))
      .test(
        "not-only-spaces",
        "Last name cannot be only spaces",
        (value) => !!value?.trim()
      )
      .max(50, t("common.form-field-error-max", { max: 50 })),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, t("common.form-field-phone-invalid"))
      .required(t("common.form-field-required-phonenumber"))
      .max(30, t("common.form-field-error-max", { max: 30 })),
    dateOfBirth: yup.string().required(t("common.form-field-required")),
    city: yup
      .string()
      .required(t("common.form-field-required"))
      .matches(
        /^[A-Za-z\s]+$/,
        "City cannot contain numbers or special characters"
      )
      .max(50, t("common.form-field-error-max", { max: 50 })),
    country: yup
      .string()
      .required(t("common.form-field-required"))
      .matches(
        /^[A-Za-z\s]+$/,
        "Country cannot contain numbers or special characters"
      )
      .max(50, t("common.form-field-error-max", { max: 50 })),
    // ✅ Make experienceYears required
    experienceYears: yup
      .number()
      .typeError("Experience Required") // handles non-numbers
      .min(0, "Experience Required") // ensures 0 is valid
      .max(20, "Max 20 years allowed")
      .required("Required"),
    nationalityId: yup
      .number()
      .required(t("common.form-field-required"))
      .min(0, "Required"), // ensures 0 is valid,
    residencePermitId: yup
      .number()
      .required(t("common.form-field-required"))
      .min(0, "Required"), // ensures 0 is valid
    countryCode: yup
      .number()
      .required(t("common.form-field-required-countrycode"))
      .min(0, "Country code Required"), // ensures 0 is valid
  });

  const salutationOptions = [
    { label: "Mr.", value: "Mr." },
    { label: "Ms.", value: "Ms." },
    { label: "Dr.", value: "Dr." },
    { label: "Mx.", value: "Mx." },
    { label: "Prof", value: "Prof" },
    { label: "None", value: "None" },
  ];
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
  const originalValues = React.useMemo(() => {
    return {
      image: personalData?.data?.imageUrlSmall || "",
      salutation: personalData?.data?.salutation
        ? {
          label: personalData.data.salutation,
          value: personalData.data.salutation,
        }
        : null,
      firstName: personalData?.data?.firstName || "",
      lastName: personalData?.data?.lastName || "",
      phoneNumber: personalData?.data?.phoneNumber || "",
      dateOfBirth: fromISOtoDate(personalData?.data?.dateOfBirth) || "",
      city: personalData?.data?.city || "",
      country: personalData?.data?.country || "",
      nationalityId: personalData?.data?.nationalityId || 0,
      residencePermitId: personalData?.data?.residencePermitId || 0,
      experienceYears: personalData?.data?.experienceYears || 0,
      countryCode: personalData?.data?.countryCode || 41,
    };
  }, [personalData]);

  const normalizeValues = (values: any) => ({
    image: values.image instanceof File ? "file" : values.image || "",
    salutation: values.salutation?.value || "",
    firstName: values.firstName?.trim() || "",
    lastName: values.lastName?.trim() || "",
    phoneNumber: values.phoneNumber || "",
    dateOfBirth: values.dateOfBirth || "",
    city: values.city?.trim() || "",
    country: values.country?.trim() || "",
    nationalityId: values.nationalityId || 0,
    residencePermitId: values.residencePermitId || 0,
    experienceYears: values.experienceYears || 0,
    countryCode: values.countryCode || "41",
  });
  let formikValues: any = null;
  const formatSwissNumber = (nationalNumber?: string) => {
    if (!nationalNumber) return "";

    const digits = nationalNumber.replace(/\D/g, "").slice(0, 9); // CH = 9 digits

    const part1 = digits.slice(0, 2);
    const part2 = digits.slice(2, 5);
    const part3 = digits.slice(5, 7);
    const part4 = digits.slice(7, 9);

    return [part1, part2, part3, part4].filter(Boolean).join(" ");
  };

  const pathname = usePathname();
  useEffect(() => {
    if (!originalValues || !formikValues) return;
    const current = normalizeValues(formikValues);
    const original = normalizeValues(originalValues);
    setHasChanges(!isEqual(current, original));
  }, [originalValues, formikValues]);

  function convertIsoToYMD(dateString: string): Date {
    const date = new Date(dateString);

    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    );
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authData = localStorage.getItem("auth-storage");
      if (authData) {
        try {
          const parsedData = JSON.parse(authData);
          const id = (parsedData?.state?.user?.eventInterviewDate) || null;
          setEventInterviewDate(id);
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
        }
      }
    }
  }, []);
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
    <Formik
      enableReinitialize={true}
      initialValues={originalValues}
      validationSchema={validationSchema}
      onSubmit={async (formData: any) => {
        const isImageChanged = formData.image && formData.image instanceof File;

        const sanitizedData = Object.keys(formData).reduce(
          (acc: { [key: string]: any }, key: string) => {
            if (key === "image") {
              if (isImageChanged) acc[key] = formData[key];
            } else if (key === "salutation") {
              acc[key] =
                formData[key] && typeof formData[key] === "object"
                  ? formData[key].value
                  : "";
            } else {
              acc[key] = formData[key] !== undefined ? formData[key] : "";
            }
            return acc;
          },
          {}
        );

        if (sanitizedData.dateOfBirth) {
          sanitizedData.dateOfBirth = sanitizedData.dateOfBirth
            .split(".")
            .reverse()
            .join("-");
        }

        const payload = new FormData();
        Object.entries(sanitizedData).forEach(([key, value]) => {
          payload.append(key, value);
        });

        createPersonalFormMutation.mutate(payload, {
          onSuccess: (data) => {
            setHasChanges(false);
            toast.success(data?.message);
            queryClient.invalidateQueries({
              queryKey: ["getPersonalDetails"],
            });

            setTimeout(() => {
              button.button === "save"
                ? null
                : router.push("/candidate/onboarding/education");
            }, 0);
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message);
          },
        });
      }}
    >
      {({ values, setFieldValue, submitCount, errors, touched }) => {
        formikValues = values;
        useEffect(() => {
          const current = normalizeValues(values);
          const original = normalizeValues(originalValues);
          setHasChanges(!isEqual(current, original));
        }, [values, originalValues]);
        return (
          <Form>
            <div className="flex justify-between align-baseline max-w-full xl:max-w-md">
              <div>
                <h3>{t("candidate.personal.title")}</h3>
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

            <ImageUploader
              name="image"
              maxSize={1}
              label={t("candidate.personal.form-uploadLogo-button")}
              formatInfo={t("candidate.personal.form-uploadInfo-format")}
              fileTypeInfo={t("candidate.personal.form-uploadInfo-type")}
              maxSizeInfo={t("candidate.personal.form-uploadInfo-maxSize")}
            />

            <div className="mt-16 vstack vstack-0">
              <div className="mb-4 max-w-full xl:max-w-md">
                <span>{t("companies.contact.form-salutation-label")}</span>
                <Select
                  name="salutation"
                  className="mt-2 max-w-full xl:max-w-md mb-4 cursor-pointer"
                  isSearchable={false}
                  isClearable
                  classNamePrefix="react-select"
                  options={salutationOptions}
                  placeholder={t(
                    "companies.contact.form-salutation-placeholder"
                  )}
                  onChange={(selectedOption) =>
                    handleSalutationChange(selectedOption, setFieldValue)
                  }
                  value={values.salutation}
                />
                {touched?.salutation &&
                  typeof errors?.salutation === "string" && (
                    <div className="text-red text-sm mt-1">
                      {errors?.salutation}
                    </div>
                  )}
              </div>

              <InputField
                required
                name="firstName"
                label={t("candidate.personal.form-firstName-label")}
                placeholder={t("candidate.personal.form-firstName-placeholder")}
                maxLength={50}
              />

              <InputField
                required
                name="lastName"
                label={t("candidate.personal.form-lastName-label")}
                placeholder={t("candidate.personal.form-lastName-placeholder")}
                maxLength={50}
              />
              <div className="mb-4 max-w-full xl:max-w-md">
                <span>{t("candidate.personal.form-phoneNumber-label")}</span>

                <div className="mt-2">
                  <PhoneInput
                    international
                    defaultCountry="CH"
                    countryCallingCodeEditable={true}

                    placeholder={t(
                      "candidate.personal.form-phoneNumber-placeholder"
                    )}
                    value={
                      values.countryCode && values.phoneNumber
                        ? `+${values.countryCode}${(values.phoneNumber)}`
                        : values.countryCode
                          ? `+${values.countryCode}`
                          : ""
                    }
                    onCountryChange={(country) => {
                      if (country) {
                        const callingCode = getCountryCallingCode(country);
                        setFieldValue("countryCode", callingCode);
                      }
                    }}

                    // ✅ Fires when user types
                    onChange={(value) => {
                      if (!value) {
                        setFieldValue("countryCode", "");
                        setFieldValue("phoneNumber", "");
                        return;
                      }

                      const parsed = parsePhoneNumber(value);

                      // Only update phoneNumber when valid
                      if (parsed?.nationalNumber) {
                        setFieldValue("phoneNumber", parsed.nationalNumber);
                      }
                    }}
                  />
                </div>
                <div className="flex gap-4">
                  {touched?.countryCode && errors?.countryCode && typeof errors?.countryCode === "string" && (
                    <div className="text-red text-sm mt-1">
                      {errors.countryCode}
                    </div>
                  )}
                  {touched?.phoneNumber && errors?.phoneNumber && typeof errors?.phoneNumber === "string" && (
                    <div className="text-red text-sm mt-1">
                      {errors.phoneNumber}
                    </div>
                  )}
                </div>
              </div>

              <div className="datebox mb-8 max-w-full xl:max-w-md">
                <DatePickerField
                  required
                  name="dateOfBirth"
                  label={t("candidate.personal.form-dateOfBirth-label")}
                  placeholder="Choose"
                  prevDate
                  today={true}
                  eligibilityDate={
                    eventInterviewDate
                      ? convertIsoToYMD(eventInterviewDate)
                      : undefined
                  }
                />
              </div>

              <div className="mb-4 max-w-full xl:max-w-md">
                <span>{t("candidate.personal.form-nationality-label")}</span>
                <Select
                  name="nationalityId"
                  className="mt-2 max-w-full xl:max-w-md mb-4 cursor-pointer"
                  isSearchable
                  isClearable
                  classNamePrefix="react-select"
                  options={searchData}
                  placeholder={t(
                    "candidate.personal.form-nationality-placeholder"
                  )}
                  onChange={(selectedOption) =>
                    onSearchChange(selectedOption, setFieldValue)
                  }
                  value={searchData.find(
                    (option: any) => option.value === values.nationalityId
                  )}
                />
                {touched?.nationalityId &&
                  typeof errors?.nationalityId === "string" && (
                    <div className="text-red text-sm mt-1">
                      {errors?.nationalityId}
                    </div>
                  )}
              </div>

              <InputField
                required
                name="city"
                label={t("candidate.personal.form-city-label")}
                placeholder={t("candidate.personal.form-city-placeholder")}
                maxLength={50}
              />

              <InputField
                required
                name="country"
                label={t("candidate.personal.form-country-label")}
                placeholder={t("candidate.personal.form-country-placeholder")}
                maxLength={50}
              />

              <span>{t("candidate.personal.form-residencePermit-label")}</span>
              <Select
                className="!mt-2 max-w-full xl:max-w-md mb-4 cursor-pointer"
                isSearchable={isSearchable}
                isClearable
                classNamePrefix="react-select"
                options={searchDataResidencial}
                placeholder={t(
                  "candidate.personal.form-residencePermit-placeholder"
                )}
                onChange={(selectedOption) =>
                  onSearchChangeResidential(selectedOption, setFieldValue)
                }
                value={searchDataResidencial.find(
                  (option: any) => option.value === values.residencePermitId
                )}
              />
              {touched?.residencePermitId &&
                typeof errors?.residencePermitId === "string" && (
                  <div className="text-red text-sm mt-1">
                    {errors?.residencePermitId}
                  </div>
                )}

              <div className="mb-4 max-w-full xl:max-w-md">
                <span>{"Experience Years*"}</span>
                <Select
                  name="experienceYears"
                  className="mt-2 max-w-full xl:max-w-md mb-4 cursor-pointer"
                  isSearchable={false}
                  isClearable
                  classNamePrefix="react-select"
                  options={Array.from({ length: 21 }, (_, i) => ({
                    value: i,
                    label: `${i} ${i === 1 ? "year" : "years"}`,
                  }))}
                  placeholder={t(
                    "candidate.personal.form-experienceYears-placeholder"
                  )}
                  onChange={(selectedOption) => {
                    setFieldValue(
                      "experienceYears",
                      selectedOption ? selectedOption.value : null
                    );
                  }}
                  value={
                    values.experienceYears !== null &&
                      values.experienceYears !== undefined
                      ? {
                        value: values.experienceYears,
                        label: `${values.experienceYears} ${values.experienceYears === 1 ? "year" : "years"
                          }`,
                      }
                      : null
                  }
                />
                {touched?.experienceYears &&
                  typeof errors?.experienceYears === "string" && (
                    <div className="text-red text-sm mt-1">
                      {errors?.experienceYears}
                    </div>
                  )}
              </div>
            </div>
            {showDialog && (
              <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                  <p className="text-lg font-medium mb-4">
                    You have unsaved changes. Are you sure you want to leave
                    this page?
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
          </Form>
        );
      }}
    </Formik>
  );
};
