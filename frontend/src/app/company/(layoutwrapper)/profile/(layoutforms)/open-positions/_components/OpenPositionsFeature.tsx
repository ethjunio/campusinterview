"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Form, Formik } from "formik";
import { OpenPositionForm } from "./OpenPositionForm";
import { formatDateOpenPosition } from "@/utils/date";
import * as y from "yup";
import { toast } from "sonner";
import { useCreateOpenPositionMutation } from "@/hooks/company/profile/useCreateOpenPostionApi";
import { useGetOpenPositionQuery } from "@/hooks/company/profile/useGetOpenPostionApi";
import { AddButton, Button } from "@/components/atoms/Button";
import { usePathname, useRouter } from "next/navigation";
import isEqual from "lodash.isequal";

const OpenPositionsFeature = () => {
  const t = useTranslations();

  const router = useRouter();
  const pathname = usePathname();
  const [initialSnapshot, setInitialSnapshot] = useState<string>("");
  const [hasChanges, setHasChanges] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const newItem = {
    id: null,
    title: "",
    positionTypeId: null,
    description: "",
    startDate: "",
    location: "",
    flexible: false,
  };

  const maxStringAndRequired = (t: any, value = 255) => {
    return y
      .string()
      .max(value, t("common.form-field-error-max", { max: value }))
      .required(t("common.form-field-required"))
      .nullable();
  };

  const normalizeValues = (vals: { extras: any[] }) => ({
    extras: vals?.extras?.map((item) => ({
      title: item.title.trim(),
      positionTypeId: item.positionTypeId?.value ?? null,
      startDate: item.startDate,
      location: item.location.trim(),
      flexible: item.flexible,
      description: item.description.trim(),
    })),
  });

  const createOpenPositionMutation = useCreateOpenPositionMutation({
    onSuccess: () => {
      toast.success("Data saved successfully");
    },
    onError: (error: any) => {
      toast.error("Something went wrong");
    },
  });
  const { data: openPositions } = useGetOpenPositionQuery();
  const [initialValues, setInitialValues] = useState({ extras: [newItem] });

  useEffect(() => {
    if (openPositions?.companyOpen) {
      const mapped = openPositions.companyOpen.map((curi: any) => ({
        ...curi,
        positionTypeId: curi?.offeredPositionType && {
          value: curi.offeredPositionType.id,
          label: curi.offeredPositionType.name,
        },
        flexible: curi.startDateFlexible && curi.startDateFlexible,
        startDate: curi.startDate
          ? formatDateOpenPosition(curi.startDate)
          : null,
      }));
      const snapshot = JSON.stringify({ extras: mapped });
      setInitialSnapshot(snapshot);
      setInitialValues({ extras: mapped });
    }
  }, [openPositions]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasChanges]);
  let formikValues: any = null;

  useEffect(() => {
    if (!initialValues || !formikValues) return;
    const current = normalizeValues(formikValues);
    const original = normalizeValues(initialValues);
    setHasChanges(!isEqual(current, original));
  }, [initialValues, formikValues]);

  useEffect(() => {
    const originalPush = router.push;

    router.push = (path: any, ...args: any[]) => {
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

  if (!initialValues) return null;
  return (
    <>
      <div>
        {initialValues && (
          <Formik
            enableReinitialize
            initialValues={initialValues}
            // validationSchema={y.object().shape({
            //   extras: y.array().of(
            //     y.object().shape({
            //       title: maxStringAndRequired(t, 80).trim(),
            //       positionTypeId: y
            //         .object()
            //         .shape({
            //           value: y.number(),
            //           label: maxStringAndRequired(t, 80),
            //         })
            //         .required(t("common.form-field-required")),
            //       startDate: y
            //         .string()
            //         .nullable()
            //         .required(t("common.form-field-required")),
            //       location: maxStringAndRequired(t, 80).trim(),
            //       flexible: y
            //         .boolean()
            //         .required(t("common.form-field-required")),
            //       description: maxStringAndRequired(t, 550).trim(),
            //     })
            //   ),
            // })}
            validationSchema={y.object().shape({
              extras: y.array().of(
                y.object().shape({
                  title: maxStringAndRequired(t, 80).trim(),
                  positionTypeId: y
                    .object()
                    .shape({
                      value: y.number(),
                      label: maxStringAndRequired(t, 80),
                    })
                    .required(t("common.form-field-required")),
                  startDate: y
                    .string()
                    .nullable()
                    .when("flexible", {
                      is: false,
                      then: (schema) =>
                        schema.required(t("common.form-field-required")),
                      otherwise: (schema) => schema.nullable(),
                    }),
                  location: maxStringAndRequired(t, 80).trim(),
                  flexible: y
                    .boolean()
                    .required(t("common.form-field-required")),
                  description: maxStringAndRequired(t, 550).trim(),
                })
              ),
            })}
            onSubmit={async ({ extras }) => {
              const formattedExtras = extras.map((extra: any) => ({
                title: extra.title,
                positionTypeId: extra.positionTypeId?.value,
                startDate: extra.startDate === "" ? null : extra.startDate,
                location: extra.location,
                startDateFlexible: extra.flexible,
                description: extra.description,
              }));

              createOpenPositionMutation.mutate(formattedExtras, {
                onSuccess: () => {
                  toast.success("Data saved successfully");
                  setHasChanges(false);
                  setInitialSnapshot(JSON.stringify({ extras }));
                },
              });
            }}
          >
            {({
              submitCount,
              errors,
              values,
              setValues,
              isSubmitting,
              setFieldValue,
            }) => {
              formikValues = values;
              useEffect(() => {
                const current = normalizeValues(values);
                const original = normalizeValues(initialValues);
                setHasChanges(!isEqual(current, original));
              }, [values, initialValues]);
              return (
                <>
                  <Form>
                    <div className="mb-10">
                      <div className="flex justify-between items-center max-w-full xl:max-w-md">
                        <div>
                          <h1 className="">
                            {t("companies.open-positions.title")}
                          </h1>
                        </div>
                        <div>
                          <Button tw="text-center" type="submit">
                            {t("common.button-save")}
                          </Button>
                        </div>
                      </div>
                      {submitCount > 0 && Object.keys(errors).length > 0 && (
                        <div className="general-text-sm mt-3 text-danger font-medium ">
                          Some required fields are not filled.
                        </div>
                      )}
                    </div>
                    {values?.extras?.length > 0 ? (
                      values?.extras?.map((extra: any, index: number) => (
                        <div className="border-b py-10">
                          <OpenPositionForm
                            key={index}
                            {...{
                              submitCount,
                              errors,
                              isSubmitting,
                              newItem,
                              values,
                              setValues,
                              setFieldValue,
                            }}
                            index={index} // 👈 dynamic index
                          />
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-center lg:justify-end">
                        <AddButton
                          disabled={values?.extras?.length >= 10}
                          onClick={() => {
                            setFieldValue("extras", [
                              ...values.extras,
                              { ...newItem },
                            ]);
                          }}
                        >
                          {t("companies.open-positions.add-position-button")}
                        </AddButton>
                      </div>
                    )}
                  </Form>
                </>
              );
            }}
          </Formik>
        )}
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
      </div>
    </>
  );
};

export default OpenPositionsFeature;
