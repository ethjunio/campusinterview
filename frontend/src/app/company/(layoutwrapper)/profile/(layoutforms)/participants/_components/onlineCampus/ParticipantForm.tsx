import React, { FC } from "react";
import { FieldArray, Form, FormikValues } from "formik";
import { useTranslations } from "next-intl";
import { InputField } from "@/components/molecules/form/InputField";
import { IconButton, Button } from "@/components/atoms/Button";
import Delete from "@/icons/ic-delete.svg";
import Plus from "@/icons/ic-plus.svg";

type Props = {
  values: FormikValues;
  isSubmitting: boolean;
};

export const ParticipantForm: FC<Props> = ({ values, isSubmitting }) => {
  const t = useTranslations();

  return (
    <Form>
      <FieldArray name="miscs">
        {(arrayHelpers) => (
          <div>
            {Array.isArray(values.miscs) &&
              values.miscs.map((_: any, index: number) => (
                <div key={index}>
                  <div className="flex flex-col lg:flex-row">
                    <div className="flex-grow max-w-screen-full lg:max-w-screen-md vstack vstack-1">
                      <InputField
                        name={`miscs[${index}].fullName`}
                        label={t("companies.participants.form-fullName-label")}
                        placeholder={t(
                          "companies.participants.form-fullName-placeholder"
                        )}
                        required
                      />
                      <InputField
                        name={`miscs[${index}].position`}
                        label={t("companies.participants.form-position-label")}
                        placeholder={t(
                          "companies.participants.form-position-placeholder"
                        )}
                        required
                      />
                    </div>
                    <IconButton
                      tw="rounded lg:ml-12 p-2 self-center lg:self-start w-auto"
                      variant="outline"
                      onClick={() => arrayHelpers.remove(index)}
                      icon={<Delete className="h-4 w-4 fill-current" />}
                    >
                      {t("candidate.miscs.button-remove")}
                    </IconButton>
                  </div>
                  <hr className="my-6" />
                </div>
              ))}
            <div className="flex justify-center lg:justify-end">
              <IconButton
                tw="rounded p-2"
                variant="outline"
                onClick={() =>
                  arrayHelpers.push({ fullName: "", position: "" })
                }
                icon={<Plus className="h-4 w-4 fill-current" />}
              >
                {t("companies.participants.add-participant")}
              </IconButton>
            </div>
          </div>
        )}
      </FieldArray>

      <div className="flex justify-center lg:justify-start">
        <Button tw="mt-4 lg:mt-0" type="submit" disabled={isSubmitting}>
          {t("common.button-save")}
        </Button>
      </div>
    </Form>
  );
};
