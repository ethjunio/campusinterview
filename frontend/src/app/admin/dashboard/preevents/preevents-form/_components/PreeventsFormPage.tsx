"use client";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import * as yup from "yup";
import { Form } from "formik";
import { ImageUploader } from "@/components/molecules/form/ImageUploader";
import { TextAreaField } from "@/components/molecules/form/TextAreaField";
import { InputField } from "@/components/molecules/form/InputField";
import { Button } from "@/components/atoms/Button";
import { useCreatePreeventsListMutation } from "@/hooks/admin/eventpreevents/useCreatePreeventsListMutation";
import { useGetEventsByIdQuery } from "@/hooks/admin/eventpreevents/useGetEventsByIdQuery";
import React from "react";
import { useGetBookingsDropdownListQuery } from "@/hooks/admin/bookings/useGetBookingsListQuery";
import { toast } from "sonner";
import { DatePickerField } from "@/app/candidate/(layoutwrapper)/profile/(layoutforms)/extracurriculars/_components/DatePickerField";
import { fromISOtoDate } from "@/utils/date";
import { SelectField } from "@/components/molecules/form/SelectField";
import useAuthStore from "@/app/store/authStore";

export const PreeventCreate = (type?: any) => {
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [searchData, setSearchData] = useState<any>([]);

  const router = useRouter();
  const t = useTranslations();

  const { user } = useAuthStore();
  const userType = user?.type;

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data } = useGetEventsByIdQuery(id || "");

  useEffect(() => {
    if (data?.data?.company?.id) {
      setSearchTerm({
        value: data.data.company.id,
        label: data.data.company.name,
      });
    }
  }, [data]);

  const createPreeventsListMutation = useCreatePreeventsListMutation();

  const initialValues = {
    id: id,
    companyId: searchTerm?.value || "",
    title: data?.data?.title || "",
    type: data?.data?.type
      ? {
          label:
            data.data.type.charAt(0).toUpperCase() + data.data.type.slice(1),
          value: data?.data?.type,
        }
      : null,
    imageUrl: data?.data?.imageUrl || "",
    eventDate: fromISOtoDate(data?.data?.eventDate) || "",
    eventTime: data?.data?.eventTime || "",
    registrationDeadline: fromISOtoDate(data?.data?.registrationDeadline) || "",
    address: data?.data?.address || "",
    website: data?.data?.website || "",
    maxParticipants: data?.data?.maxParticipants || "",
    description: data?.data?.description || "",
  };

  console.log(initialValues, "initial values");

  const validationSchema = yup.object().shape({
    companyId: yup
      .string()
      .nullable()
      .required(t("common.form-field-required")),
    title: yup
      .string()
      .required(t("common.form-field-required"))
      .test(
        "not-only-spaces",
        "Title cannot be only spaces",
        (value) => !!value?.trim(),
      )
      .max(50, t("common.form-field-error-max", { max: 50 })),
    type: yup.mixed().required(t("common.form-field-required")),
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
        },
      )
      .matches(
        /^((https?|ftp|smtp):\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i,
        t("companies.general.form-website-error-invalidUrl"),
      ),
    description: yup
      .string()
      .trim()
      .required(t("common.form-field-required"))
      .max(5000, t("common.form-field-error-max", { max: 5000 })),
    maxParticipants: yup
      .number()
      .required(t("common.form-field-required"))
      .min(1, "Minimum participants must be at least 1")
      .max(1000, "Maximum participants cannot exceed 1000")
      .integer("Must be a whole number"),
    address: yup
      .string()
      .required(t("common.form-field-required"))
      .test(
        "not-only-spaces",
        "Address cannot be only spaces",
        (value) => !!value?.trim(),
      )
      .max(200, t("common.form-field-error-max", { max: 200 })),
    eventTime: yup
      .string()
      .required(t("common.form-field-required"))
      .matches(
        /^(1[0-2]|0?[1-9]):[0-5][0-9]\s*(AM|PM)\s*-\s*(1[0-2]|0?[1-9]):[0-5][0-9]\s*(AM|PM)$/,
        "Please enter a valid time in hh:mm AM/PM format (e.g., 02:30 PM-04:30 PM)",
      ),
    eventDate: yup.string().required(t("common.form-field-required")),
    registrationDeadline: yup
      .string()
      .required(t("common.form-field-required")),
  });

  const { data: options } = useGetBookingsDropdownListQuery();

  useEffect(() => {
    if (options?.data) {
      const searchData = options?.data?.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setSearchData(searchData);
    }
  }, [options?.data]);

  const onSearchChange = (selectedOption: any) => {
    setSearchTerm(selectedOption);
  };

  return (
    <div className="max-w-xl">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (formData: any) => {
          // Check if the image has changed
          const isImageChanged =
            formData.imageUrl && formData.imageUrl instanceof File;

          // Prepare sanitized data
          const sanitizedData = Object.keys(formData).reduce(
            (acc: { [key: string]: any }, key: string) => {
              // Skip id if it's not present
              if (key === "id" && !formData[key]) {
                return acc;
              }
              if (key === "imageUrl") {
                if (isImageChanged) acc[key] = formData[key];
              } else if (key === "type") {
                // Convert to string if it's an object
                acc[key] =
                  typeof formData[key] === "object"
                    ? formData[key]?.value || ""
                    : formData[key];
              } else {
                acc[key] = formData[key] !== undefined ? formData[key] : "";
              }
              return acc;
            },
            {},
          );

          // Convert to FormData for API submission
          const payload = new FormData();
          Object.entries(sanitizedData).forEach(([key, value]) => {
            payload.append(key, value);
          });

          // Call the mutation with FormData payload
          createPreeventsListMutation.mutate(payload, {
            onSuccess: (success: any) => {
              toast.success(success?.message || "Data saved successfully");
              if (type?.type == "company") {
                router.push("/company/pre-event");
              } else {
                router.push("/admin/dashboard/preevents");
              }
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Something went wrong",
              );
            },
          });
        }}
      >
        {({ errors, touched }) => (
          <Form className="vstack vstack-6">
            <ImageUploader
              name="imageUrl"
              maxSize={10}
              label={t("admin.preevent-edit.form-uploadLogo-button")}
              formatInfo={t("admin.preevent-edit.form-uploadInfo-format")}
              fileTypeInfo={t("admin.preevent-edit.form-uploadInfo-type")}
              maxSizeInfo={t("candidate.personal.form-uploadInfo-maxSize")}
            />

            <div className="mb-4">
              <div className="flex items-center gap-1">
                <span>Company</span>
                <span className="text-red-500">*</span>
              </div>
              <Select
                isDisabled={type?.type == "company"}
                className="mt-2 max-w-full xl:max-w-md cursor-pointer"
                isSearchable
                isClearable
                classNamePrefix="react-select"
                options={searchData}
                placeholder={t(
                  "admin.interviews.matches.search-company-placeholder",
                )}
                onChange={onSearchChange}
                value={searchTerm}
              />
              {errors.companyId && touched.companyId && (
                <div className="general-text-sm text-danger ml-1 ">
                  {typeof errors.companyId === "string" ? errors.companyId : ""}
                </div>
              )}
            </div>

            <InputField
              required
              name="title"
              label={t("admin.preevent-edit.form-title-label")}
              placeholder={t("admin.preevent-edit.form-title-placeholder")}
            />

            <SelectField
              required
              name="type"
              label={t("admin.preevent-edit.form-type-label")}
              placeholder={t("admin.preevent-edit.form-type-placeholder")}
              options={[
                { value: "online-pre-event", label: "Online Pre-Event" },
                { value: "pre-event", label: "Pre-Event" },
                { value: "workshop", label: "Workshop" },
              ]}
            />

            <div className="datebox mb-8 max-w-full xl:max-w-md">
              <DatePickerField
                required
                name="eventDate"
                label={t("admin.preevent-edit.form-eventDate-label")}
                placeholder="Choose"
                nextDate
                today={true}
                disabled={userType!== "admin"}
              />
            </div>

            <InputField
              required
              name="eventTime"
              label={t("admin.preevent-edit.form-eventTime-label")}
              placeholder={t("admin.preevent-edit.form-eventTime-placeholder")}
              disabled={userType!== "admin"}
            />

            <div className="datebox mb-8 max-w-full xl:max-w-md">
              <DatePickerField
                required
                name="registrationDeadline"
                label={t("admin.preevent-edit.form-registrationDeadline-label")}
                placeholder="Choose"
                nextDate
                today={true}
              />
            </div>

            <InputField
              required
              type="number"
              name="maxParticipants"
              label={t("admin.preevent-edit.form-maxParticipants-label")}
              placeholder={t(
                "admin.preevent-edit.form-maxParticipants-placeholder",
              )}
            />

            <InputField
              required
              name="address"
              label={t("admin.preevent-edit.form-address-label")}
              placeholder={t("admin.preevent-edit.form-address-placeholder")}
            />

            <InputField
              required
              name="website"
              label={t("admin.preevent-edit.form-website-label")}
              placeholder={t("admin.preevent-edit.form-website-placeholder")}
            />

            <TextAreaField
              required
              maxLength={5000}
              name="description"
              label={t("admin.preevent-edit.form-description-label")}
              placeholder={t(
                "admin.preevent-edit.form-description-placeholder",
              )}
            />

            <Button type="submit" tw="mt-12 max-w-xs">
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
