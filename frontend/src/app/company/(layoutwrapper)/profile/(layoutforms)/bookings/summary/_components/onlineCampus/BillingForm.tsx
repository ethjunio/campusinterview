import React, { FC } from "react";
import { Formik, Form } from "formik";
import { InputField } from "@/components/molecules/form/InputField";
import { Checkbox } from "@/components/molecules/form/Checkbox";
import { useTranslations } from "next-intl";
import { SelectField } from "@/components/molecules/form/SelectField";
import * as y from "yup";

export const maxString = (t: any, value = 255) => {
  return y
    .string()
    .max(value, t("common.form-field-error-max", { max: value }))
    .nullable();
};

export const maxStringAndRequired = (t: any, value = 255) => {
  return y
    .string()
    .max(value, t("common.form-field-error-max", { max: value }))
    .required(t("common.form-field-required"))
    .nullable();
};

export const emailRequired = (t: any, value = 255) => {
  return y
    .string()
    .required(t("auth.form-error-required"))
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      t("auth.form-email-error-invalid")
    )
    .max(50, t("common.form-field-error-max", { max: value }));
};

const defaultInitialValues = {
  billingName: "",
  billingEmail: "",
  salutation: {
    label: "",
    value: "",
  },
  firstName: "",
  lastName: "",
  streetAddress: "",
  additionalAddress: "",
  postBox: "",
  postCode: "",
  city: "",
  country: "",
  invoiceNumber: "",
  accept: false,
};

export const billingValidationSchema = (t: (key: string) => string) =>
  y.object({
    salutation:  y
    .object({
      value: y
        .string()
        .oneOf(["Mr.", "Dr.", "Mrs.", "Ms.", "Miss"], "invalid"),
      label: y.string(),
    })
    .nullable()                  // allow null
    .default(null),
    billingName: maxStringAndRequired(t, 255).trim(),
    billingEmail: emailRequired(t, 50),
    firstName: maxStringAndRequired(t, 255).trim(),
    lastName: maxStringAndRequired(t, 255).trim(),
    streetAddress: maxStringAndRequired(t, 255).trim(),
    additionalAddress: maxString(t, 255),
    postBox: maxString(t, 255),
    postCode: maxStringAndRequired(t, 255).trim(),
    city: maxStringAndRequired(t, 255).trim(),
    country: maxStringAndRequired(t, 255).trim(),
    invoiceNumber: maxString(t, 255),
    accept: y
      .bool()
      .oneOf([true], t("companies.bookings.form-accept-error-notAccepted")),
  });

const salutationOptions = [
  { label: "Mr.", value: "Mr." },
  { label: "Ms.", value: "Ms." },
  { label: "Dr.", value: "Dr." },
  { label: "Mx.", value: "Mx." },
  { label: "Prof", value: "Prof" },
  { label: "None", value: "None" },
];

type FormValues = typeof defaultInitialValues;
type Props = {
  onSubmit: (input: Omit<FormValues, "accept">) => void;
  initialValues?: FormValues;
  children?: React.ReactNode;
};

export const BillingForm: FC<Props> = ({
  children,
  onSubmit,
  initialValues,
}) => {
  const t = useTranslations();

  // Object.assign(initialValues?initialValues:defaultInitialValues, defaultInitialValues);
  return (
    <Formik
      enableReinitialize
      validationSchema={billingValidationSchema(t)}
      initialValues={initialValues ?? defaultInitialValues}
      onSubmit={async ({ accept, ...input }) => {
        if (accept) {
          await onSubmit(input);
        }
      }}
    >
      <Form className="mt-20 vstack vstack-4 max-w-xl">
        <h5 className="mb-4">Billing Address</h5>
        <InputField
          name="billingName"
          label={t("companies.bookings.form-billing-name-label")}
          placeholder={t("companies.bookings.form-billing-name-label")}
          required
        />
        <InputField
          name="billingEmail"
          label={t("companies.bookings.form-billing-email-label")}
          placeholder={t("companies.bookings.form-billing-email-label")}
          required
        />
        {/* <InputField
          name="salutation"
          label={t('companies.bookings.form-salutation-label')}
          placeholder={t('companies.bookings.form-salutation-placeholder')}
        /> */}
        <SelectField
          name={`salutation`}
          label={t("companies.bookings.form-salutation-label")}
          options={salutationOptions}
          placeholder={t("companies.bookings.form-salutation-placeholder")}
        />
        <InputField
          name="firstName"
          label={t("companies.bookings.form-first-name-label")}
          placeholder={t("companies.bookings.form-first-name-placeholder")}
          required
        />
        <InputField
          name="lastName"
          label={t("companies.bookings.form-last-name-label")}
          placeholder={t("companies.bookings.form-last-name-placeholder")}
          required
        />
        <InputField
          name="streetAddress"
          label={t("companies.bookings.form-street-address-label")}
          placeholder={t("companies.bookings.form-street-address-placeholder")}
          required
        />
        <InputField
          name="additionalAddress"
          label={t("companies.bookings.form-additional-address-label")}
          placeholder={t(
            "companies.bookings.form-additional-address-placeholder"
          )}
        />
        <InputField
          name="postBox"
          label={t("companies.bookings.form-post-box-label")}
          placeholder={t("companies.bookings.form-post-box-placeholder")}
        />
        <div className="hstack hstack-4 justify-between max-w-md">
          <div className="flex-grow">
            <InputField
              name="postCode"
              label={t("companies.bookings.form-post-code-label")}
              placeholder={t("companies.bookings.form-post-code-placeholder")}
              required
            />
          </div>
          <div className="flex-grow">
            <InputField
              name="city"
              label={t("companies.bookings.form-city-label")}
              placeholder={t("companies.bookings.form-city-placeholder")}
              required
            />
          </div>
        </div>

        <InputField
          name="country"
          label={t("companies.bookings.form-country-label")}
          placeholder={t("companies.bookings.form-country-placeholder")}
          required
        />
        <InputField
          name="invoiceNumber"
          label={t("companies.bookings.form-invoice-number-label")}
          placeholder={t("companies.bookings.form-invoice-number-placeholder")}
        />

        <Checkbox className="mt-10" name="accept">
          {t.rich("companies.bookings.form-accept-label", {
            a: (chunks) => (
              <a
                href="https://cdn.campusinterview.ch/production/test/legal-docs/terms-and-conditions.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </Checkbox>
        <div className="mt-2">{children}</div>
      </Form>
    </Formik>
  );
};
