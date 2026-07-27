"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { InputField } from "@/components/molecules/form/InputField";
import { Button } from "@/components/atoms/Button";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { SelectField } from "@/components/molecules/form/SelectField";
import { useCreateCompanyContactDataMutation } from "@/hooks/company/onboarding/useCreateCompanyContactDataMutation";
import { useGetCompanyGeneralDataQuery } from "@/hooks/company/onboarding/useGetCompanyGeneralDataQuery";
import { useGetLanguageDropdown } from "@/hooks/company/profile/useGetLanguageDropdown";
import { dataToOption } from "@/utils";
import { isEqual } from "lodash";

const extractContact = (data: any, type: string) => {
  return (
    data.find((contact: any) => contact.type === type) || {
      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      language: null,
    }
  );
};

function normalizeForm(values: any) {
  const normalizeContact = (contact: any) => ({
    salutation: contact.salutation?.value || "",
    firstName: contact.firstName?.trim() || "",
    lastName: contact.lastName?.trim() || "",
    email: contact.email?.trim() || "",
    phoneNumber: contact.phoneNumber?.trim() || "",
    language: contact.language?.value?.value || "",
  });

  return {
    main: normalizeContact(values.main),
    deputy: normalizeContact(values.deputy),
  };
}

export const ContactForm = ({ button }: { button?: any }) => {
  const router = useRouter();
  const t = useTranslations();
  const [hasChanges, setHasChanges] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const formikRef = useRef<any>(null);
  const createContactFormMutation = useCreateCompanyContactDataMutation();
  const pathname = usePathname();
  const { data: LanguageOption } = useGetLanguageDropdown();
  const { data } = useGetCompanyGeneralDataQuery();

  const mainContact = extractContact(data?.CompanyContacts || [], "main");
  const deputyContact = extractContact(data?.CompanyContacts || [], "deputy");

  const languages = LanguageOption?.map(dataToOption) || [];

  const salutationOptions = [
    { label: "Mr.", value: "Mr." },
    { label: "Dr.", value: "Dr." },
    { label: "Mx.", value: "Mx." },
    { label: "Ms.", value: "Ms." },
    { label: "Prof", value: "Prof" },
    { label: "None", value: "None" },
  ];

  const validationSchema = yup.object().shape({
    main: yup.object().shape({
      firstName: yup
        .string()
        .required(t("common.form-field-required"))
        .matches(
          /^[A-Za-z\s]+$/,
          "First name cannot contain numbers or special characters"
        )
        .test(
          "not-only-spaces",
          "First name cannot be only spaces",
          (value) => !!value?.trim()
        )
        .max(50, t("common.form-field-error-max", { max: 50 })),
      lastName: yup
        .string()
        .required(t("common.form-field-required"))
        .matches(
          /^[A-Za-z\s]+$/,
          "Last name cannot contain numbers or special characters"
        )
        .test(
          "not-only-spaces",
          "Last name cannot be only spaces",
          (value) => !!value?.trim()
        )
        .max(50, t("common.form-field-error-max", { max: 50 })),

      email: yup
        .string()
        .required(t("common.form-field-required"))
        .email(t("common.form-field-email-invalid"))
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          t("common.form-field-email-invalid")
        )
        .max(50, t("common.form-field-error-max", { max: 50 })),

      phoneNumber: yup
        .string()
        .required(t("common.form-field-required"))
        .max(30, t("common.form-field-error-max", { max: 30 }))
        .matches(
          /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
          t("common.form-field-phone-invalid")
        ),
      language: yup
        .object()
        .shape({
          value: yup
            .object()
            .shape({
              value: yup.string().nullable(),
              label: yup.string().nullable(),
            })
            .nullable(),
        })
        .nullable(),
    }),

    deputy: yup.object().shape({
      salutation: yup
      .object({
        value: yup.string().oneOf(["Mr.", "Dr.", "Mrs.", "Ms.", "Miss"]),
        label: yup.string(),
      })
      .required("Saluation required"),
      firstName: yup
        .string()
        .nullable()
        .test(
          "not-only-spaces",
          "First name cannot be only spaces",
          (value) => !value || !!value.trim()
        )
        .matches(
          /^[A-Za-z\s]*$/,
          "First name cannot contain numbers or special characters"
        )
        .max(50, t("common.form-field-error-max", { max: 50 })),
      lastName: yup
        .string()
        .nullable()
        .matches(
          /^[A-Za-z\s]+$/,
          "Last name cannot contain numbers or special characters"
        )
        .test(
          "not-only-spaces",
          "Last name cannot be only spaces",
          (value) => !value || !!value.trim()
        )
        .max(50, t("common.form-field-error-max", { max: 50 })),
      email: yup
        .string()
        .email(t("common.form-field-email-invalid"))
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          t("common.form-field-email-invalid")
        )
        .max(50, t("common.form-field-error-max", { max: 50 })),
      phoneNumber: yup
        .string()
        .max(30, t("common.form-field-error-max", { max: 30 }))
        .matches(
          /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
          t("common.form-field-phone-invalid")
        ),

      // ✅ Make the language field **fully optional**
      language: yup
        .object()
        .shape({
          value: yup
            .object()
            .shape({
              value: yup.string().nullable(),
              label: yup.string().nullable(),
            })
            .nullable(),
        })
        .nullable(),
    }),
  });
  const initialValues = useMemo(() => ({
    main: {
      salutation: mainContact.salutation ? { label: mainContact.salutation, value: mainContact.salutation } : null,
      firstName: mainContact.firstName || "",
      lastName: mainContact.lastName || "",
      email: mainContact.email || "",
      phoneNumber: mainContact.phoneNumber || "",
      language: mainContact.language ? {
        value: {
          label: mainContact.language?.name,
          value: mainContact.contactLanguageId,
        },
      } : null,
    },
    deputy: {
      salutation: deputyContact.salutation ? { label: deputyContact.salutation, value: deputyContact.salutation } : null,
      firstName: deputyContact.firstName || "",
      lastName: deputyContact.lastName || "",
      email: deputyContact.email || "",
      phoneNumber: deputyContact.phoneNumber || "",
      language: deputyContact.language ? {
        value: {
          label: deputyContact.language?.name,
          value: deputyContact.contactLanguageId,
        },
      } : null,
    },
  }), [data]);
  const normalize = (values: any) => JSON.stringify(values);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = formikRef.current?.values;
      if (current) {
        setHasChanges(!isEqual(normalize(current), normalize(initialValues)));
      }
    }, 500);
    return () => clearInterval(interval);
  }, [initialValues]);
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
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (formData) => {
          const data = {
            main: {
              salutation: formData.main.salutation?.value || "",
              firstName: formData.main.firstName,
              lastName: formData.main.lastName,
              email: formData.main.email,
              phoneNumber: formData.main.phoneNumber,
              language:
                formData.main.language?.value?.value?.toString() || null,
            },
            deputy: {
              salutation: formData.deputy.salutation?.value || "",
              firstName: formData.deputy.firstName,
              lastName: formData.deputy.lastName,
              email: formData.deputy.email,
              phoneNumber: formData.deputy.phoneNumber,
              language:
                formData.deputy.language?.value?.value?.toString() || null,
            },
          };
          
          createContactFormMutation.mutate(data, {
            onSuccess: (data) => {
              setHasChanges(false);
              toast.success("Data saved successfully");
              
              setTimeout(() => {
                if (button !== "save") router.push("/company/onboarding/facts");
              }, 0);
              
            },
            onError: (error) => toast.error("Error in saving data"),
          });
        }}
      >
        {({ submitCount, values, errors }) => {
          useEffect(() => {
            const normalized = normalizeForm(values);
            const original = normalizeForm(initialValues); // set initialValues with useMemo
            setHasChanges(!isEqual(normalized, original));
          }, [values]);
         return <Form>
            <div className="flex justify-between items-center max-w-full xl:max-w-md">
              <div><h1 className="">{t("companies.contact.title")}</h1></div>
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
            {["main", "deputy"].map((role) => (
              <div key={role}>
                <h3 className="mb-6">
                  {t(`companies.contact.contact-${role}`)}
                </h3>

                {/* <InputField
                  name={`${role}.salutation`}
                  placeholder={t(
                    "companies.contact.form-salutation-placeholder"
                  )}
                  label={t("companies.contact.form-salutation-label")}
                /> */}

                <SelectField
                  name={`${role}.salutation`}
                  label={t("companies.contact.form-salutation-label")}
                  options={salutationOptions}
                  placeholder={t("companies.contact.form-salutation-placeholder")}
                />

                <InputField
                  required={role === "main"} // Required only for "main"
                  name={`${role}.firstName`}
                  label={t("companies.contact.form-firstName-label")}
                  placeholder={t(
                    "companies.contact.form-firstName-placeholder"
                  )}
                  maxLength={50}
                />

                <InputField
                  required={role === "main"} // Required only for "main"
                  name={`${role}.lastName`}
                  label={t("companies.contact.form-lastName-label")}
                  placeholder={t("companies.contact.form-lastName-placeholder")}
                  maxLength={50}
                />

                <InputField
                  required={role === "main"} // Required only for "main"
                  name={`${role}.email`}
                  label={t("companies.contact.form-email-label")}
                  placeholder={t("companies.contact.form-email-placeholder")}
                  maxLength={50}
                />

                <InputField
                  required={role === "main"} // Required only for "main"
                  name={`${role}.phoneNumber`}
                  label={t("companies.contact.form-phoneNumber-label")}
                  placeholder={t(
                    "companies.contact.form-phoneNumber-placeholder"
                  )}
                  maxLength={30}
                />

                <SelectField
                  // required={role === "main"}
                  options={languages}
                  name={`${role}.language.value`}
                  label={t("companies.contact.form-language-label")}
                  placeholder={t("companies.contact.form-language-placeholder")}
                />
                {/*@ts-ignore */}
                {role === "main" && errors?.main?.language && (
                  <p className="text-danger text-sm relative top-[-22px]">
                    {/*@ts-ignore */}
                    {errors.main.language}
                  </p>
                )}
              </div>
            ))}

        
          </Form>
        }}
      </Formik>
      {showDialog && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <p className="text-lg font-medium mb-4">
              You have unsaved changes. Are you sure you want to leave this page?
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
