import * as y from "yup";

const validationSchema = (t: any) => ({
  email: y
    .string()
    .required(t("auth.form-error-required"))
    .email(t("auth.form-email-error-invalid"))
    .max(40, t("common.form-field-error-max", { max: 40 })),
  password: y.string().required(t("auth.form-error-required")),
});

export const loginValidationSchema = (t: any) => y.object(validationSchema(t));
