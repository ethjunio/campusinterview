"use client";

import { useGetEventDayRecordsQuery } from "@/hooks/admin/useGetEventDayRecordsQuery";
import { fromISOtoDate } from "@/utils/date";
import { useTranslations } from "next-intl";
import React from "react";
import { Formik, Form } from "formik";
import { DayPicker } from "react-day-picker";
import { InputField } from "@/components/molecules/form/InputField";
import * as Yup from "yup";
import { format } from "date-fns";
import "react-day-picker/style.css";
import { useUpdateEventDayRecordMutation } from "@/hooks/admin/useUpdateEventDayRecordMutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

// Validation schema
const validationSchema = Yup.object().shape({
  eventName: Yup.string().required("Required"),
  maxCountPerCompany: Yup.number().required("Required").min(0),
  economyRooms: Yup.number().required("Required").min(0),
  businessRooms: Yup.number().required("Required").min(0),
  workshopRooms: Yup.number().required("Required").min(0),
  presentations: Yup.number().required("Required").min(0),
  companyPresentations: Yup.number().required("Required").min(0),
  miniBooths: Yup.number().required("Required").min(0),
  workshops: Yup.number().required("Required").min(0),
});

function DatePickerField({
  name,
  label,
  value,
  onChange,
}: {
  name: string;
  label: string;
  value: Date;
  onChange: (date: Date) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1 event-daylabel">
        {label}
      </label>
      <input
        type="text"
        className="form-input block w-full rounded "
        value={format(value, "yyyy-MM-dd")}
        onClick={() => setIsOpen(true)}
        readOnly
      />
      {isOpen && (
        <div className="absolute z-10 bg-white shadow-lg rounded-lg mt-1 border">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => {
              if (date) {
                onChange(date);
                setIsOpen(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
export default function EventDayPage() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { data, isPending } = useGetEventDayRecordsQuery();

  const useUpdateEventDayRecordsMutation = useUpdateEventDayRecordMutation({
    onSuccess: () => {
      toast.success("Data updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["eventDayRecords"],
      });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  if (isPending) return <div>Loading...</div>;

  const initialValues = {
    eventName: data?.data?.eventName,
    eventDate: new Date(data?.data?.eventDate),
    registrationOpenDate: new Date(data?.data?.registrationOpenDate),
    companyRegistrationCloseDate: new Date(
      data?.data?.companyRegistrationCloseDate
    ),
    candidateRegistrationCloseDate: new Date(
      data?.data?.candidateRegistrationCloseDate
    ),
    matchingOpenDate: new Date(data?.data?.matchingOpenDate),
    matchingCloseDate: new Date(data?.data?.matchingCloseDate),
    signInCloseDate: new Date(data?.data?.signInCloseDate),
    companyBookingCloseDate: new Date(data?.data?.companyBookingCloseDate),
    areInterviewsPublished: data?.data?.areInterviewsPublished,
    areParticipantsNotified: data?.data?.areParticipantsNotified,
    maxCountPerCompany: data?.data?.maxCountPerCompany,
    economyRooms: data?.data?.economyRooms,
    businessRooms: data?.data?.businessRooms,
    workshopRooms: data?.data?.workshopRooms,
    presentations: data?.data?.presentations,
    companyPresentations: data?.data?.companyPresentations,
    miniBooths: data?.data?.miniBooths,
    workshops: data?.data?.workshops,
  };

  function toLocalDateString(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = (values: typeof initialValues) => {
    // Convert all date fields to ISO format
    const formattedValues = {
      ...values,
      eventDate: toLocalDateString(values.eventDate),
      registrationOpenDate: toLocalDateString(values.registrationOpenDate),
      companyRegistrationCloseDate: toLocalDateString(values.companyRegistrationCloseDate),
      candidateRegistrationCloseDate: toLocalDateString(
        values.candidateRegistrationCloseDate
      ),
      matchingOpenDate: toLocalDateString(values.matchingOpenDate),
      matchingCloseDate: toLocalDateString(values.matchingCloseDate),
      signInCloseDate: toLocalDateString(values.signInCloseDate),
      companyBookingCloseDate: toLocalDateString(values.companyBookingCloseDate),
    };
    // TODO: Implement your update logic here with formattedValues
    useUpdateEventDayRecordsMutation.mutate(formattedValues);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Booking & Event</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6 evnetday-edit">
            <InputField
              name="eventName"
              label="Interview name"
              required
              className="xl:!max-w-[456px] w-full text-sm"
            />

            {/* Date Picker Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 !mt-0">
              <DatePickerField
                name="eventDate"
                label="Interview date"
                value={values.eventDate}
                onChange={(date) => setFieldValue("eventDate", date)}
              />
              <DatePickerField
                name="registrationOpenDate"
                label="Registration open date"
                value={values.registrationOpenDate}
                onChange={(date) => setFieldValue("registrationOpenDate", date)}
              />
              <DatePickerField
                name="companyRegistrationCloseDate"
                label="Company Registration close date"
                value={values.companyRegistrationCloseDate}
                onChange={(date) =>
                  setFieldValue("companyRegistrationCloseDate", date)
                }
              />
              <DatePickerField
                name="candidateRegistrationCloseDate"
                label="Candidate registration close date"
                value={values.candidateRegistrationCloseDate}
                onChange={(date) =>
                  setFieldValue("candidateRegistrationCloseDate", date)
                }
              />
              <DatePickerField
                name="matchingOpenDate"
                label="Matching open date"
                value={values.matchingOpenDate}
                onChange={(date) => setFieldValue("matchingOpenDate", date)}
              />
              <DatePickerField
                name="matchingCloseDate"
                label="Matching close date"
                value={values.matchingCloseDate}
                onChange={(date) => setFieldValue("matchingCloseDate", date)}
              />
              <DatePickerField
                name="signInCloseDate"
                label="Sign in close date"
                value={values.signInCloseDate}
                onChange={(date) => setFieldValue("signInCloseDate", date)}
              />
              <DatePickerField
                name="companyBookingCloseDate"
                label="Company booking close date"
                value={values.companyBookingCloseDate}
                onChange={(date) =>
                  setFieldValue("companyBookingCloseDate", date)
                }
              />
            </div>

            {/* Numeric Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 !mt-0 ">
              <InputField
                name="maxCountPerCompany"
                label="Maximum room allowed per company per room type"
                type="number"
                required
                className="xl:!max-w-full w-full text-sm"
              />
              <InputField
                name="economyRooms"
                label="Remaining economy rooms"
                type="number"
                required
                className="xl:!max-w-full w-full text-sm"
              />
              <InputField
                name="businessRooms"
                label="Remaining business rooms"
                type="number"
                required
                className="xl:!max-w-full w-full text-sm"
              />
              <InputField
                name="workshopRooms"
                label="Remaining workshop rooms"
                type="number"
                required
                className="xl:!max-w-full w-full text-sm"
              />
              <InputField
                name="presentations"
                label="Remaining pre-event: online"
                type="number"
                required
                className="xl:!max-w-full w-full text-sm"
              />
              <InputField
                name="companyPresentations"
                label="Remaining company presentations"
                type="number"
                required
                className="xl:!max-w-full w-full text-sm"
              />
              <InputField
                name="miniBooths"
                label="Remaining mini booths"
                type="number"
                required
                className="xl:!max-w-full w-full text-sm"
              />
              <InputField
                name="workshops"
                label="Remaining pre-event: on-campus"
                type="number"
                required
                className="xl:!max-w-full w-full text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={useUpdateEventDayRecordsMutation.isPending}
            >
              {t("admin.event-day.edit.submit-button-title")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
