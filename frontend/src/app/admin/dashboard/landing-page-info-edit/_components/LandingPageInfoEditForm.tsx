"use client";

import { useGetLandingPageInfoQuery } from "@/hooks/admin/useGetLandingPageInfoQuery";
import { useTranslations } from "next-intl";
import { Formik, Form } from "formik";
import { TextAreaField } from "@/components/molecules/form/TextAreaField";
import { InputField } from "@/components/molecules/form/InputField";
import * as Yup from "yup";
import { useUpdateLandingPageInfoMutation } from "@/hooks/admin/useUpdateLandingPageInfoMutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const validationSchema = Yup.object().shape({
  mainPageStudentsBox: Yup.string().required("Required"),
  mainPageCompaniesBox: Yup.string().required("Required"),
  mainPageWhatBox: Yup.string().required("Required"),
  mainPageWhoBox: Yup.string().required("Required"),
  candidatePageRegistrationBox: Yup.string().required("Required"),
  candidatePageMakeCVBox: Yup.string().required("Required"),
  candidatePageRequestInterviewsBox: Yup.string().required("Required"),
  candidatePageInterviewDayBox: Yup.string().required("Required"),
  companyPageWhyBox: Yup.string().required("Required"),
  companyPageRegistrationBox: Yup.string().required("Required"),
  companyPageBookingBox: Yup.string().required("Required"),
  companyPageRequestInterviewsBox: Yup.string().required("Required"),
  companyPageInterviewDayBox: Yup.string().required("Required"),
  companyPageBenefitBox: Yup.string().required("Required"),
  agendaInterviewsRange: Yup.string().required("Required"),
  agendaLunchRange: Yup.string().required("Required"),
  agendaSnacksRange: Yup.string().required("Required"),
  locationLine1: Yup.string().required("Required"),
  locationLine2: Yup.string().required("Required"),
  locationLine3: Yup.string().required("Required"),
  distribution_degree_id: Yup.number().required("Required"),
  distribution_study_fields_id: Yup.number().required("Required"),
  "distributionDegrees.master": Yup.string().required("Required"),
  "distributionDegrees.bachelor": Yup.string().required("Required"),
  "distributionDegrees.phd": Yup.string().required("Required"),
  "distributionStudyFields.engineering": Yup.string().required("Required"),
  "distributionStudyFields.naturalSciences": Yup.string().required("Required"),
  "distributionStudyFields.economics": Yup.string().required("Required"),
  "distributionStudyFields.other": Yup.string().required("Required"),
});

export default function LandingPageInfoEditForm() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { data, isPending } = useGetLandingPageInfoQuery();

  const updateLandingPageInfoMutation = useUpdateLandingPageInfoMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landingPageInfo"] });
      toast.success("Landing page info updated successfully");
    },
    onError: (error:any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  if (isPending) return <div>Loading...</div>;

  const initialValues = {
    ...data.data,
    distribution_degree_id: data.data.distribution_degree_id,
    distribution_study_fields_id: data.data.distribution_study_fields_id,
    "distributionDegrees.master": data.data.distributionDegrees.master,
    "distributionDegrees.bachelor": data.data.distributionDegrees.bachelor,
    "distributionDegrees.phd": data.data.distributionDegrees.phd,
    "distributionStudyFields.engineering":
      data.data.distributionStudyFields.engineering,
    "distributionStudyFields.naturalSciences":
      data.data.distributionStudyFields.naturalSciences,
    "distributionStudyFields.economics":
      data.data.distributionStudyFields.economics,
    "distributionStudyFields.other": data.data.distributionStudyFields.other,
  };

  const handleSubmit = async (values: any) => {
    updateLandingPageInfoMutation.mutate({
      mainPageStudentsBox: values.mainPageStudentsBox,
      mainPageCompaniesBox: values.mainPageCompaniesBox,
      mainPageWhatBox: values.mainPageWhatBox,
      mainPageWhoBox: values.mainPageWhoBox,
      candidatePageRegistrationBox: values.candidatePageRegistrationBox,
      candidatePageMakeCVBox: values.candidatePageMakeCVBox,
      candidatePageRequestInterviewsBox:
        values.candidatePageRequestInterviewsBox,
      candidatePageInterviewDayBox: values.candidatePageInterviewDayBox,
      companyPageWhyBox: values.companyPageWhyBox,
      companyPageRegistrationBox: values.companyPageRegistrationBox,
      companyPageBookingBox: values.companyPageBookingBox,
      companyPageRequestInterviewsBox: values.companyPageRequestInterviewsBox,
      companyPageInterviewDayBox: values.companyPageInterviewDayBox,
      companyPageBenefitBox: values.companyPageBenefitBox,
      agendaInterviewsRange: values.agendaInterviewsRange,
      agendaLunchRange: values.agendaLunchRange,
      agendaSnacksRange: values.agendaSnacksRange,
      locationLine1: values.locationLine1,
      locationLine2: values.locationLine2,
      locationLine3: values.locationLine3,
      distributionDegrees: {
        master: values.distributionDegrees.master,
        bachelor: values.distributionDegrees.bachelor,
        phd: values.distributionDegrees.phd,
      },
      distributionStudyFields: {
        engineering: values.distributionStudyFields.engineering,
        naturalSciences: values.distributionStudyFields.naturalSciences,
        economics: values.distributionStudyFields.economics,
        other: values.distributionStudyFields.other,
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-6">
        {/* Previous sections remain the same */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Edit landing page values</h2>
          <TextAreaField
            name="mainPageStudentsBox"
            label={t(
              "admin.landing-page-info.edit.form-mainPageStudentsBox-label"
            )}
            placeholder={t(
              "admin.landing-page-info.edit.form-mainPageStudentsBox-placeholder"
            )}
            rows={4}
            maxLength={1000}
            required
          />
          <TextAreaField
            name="mainPageCompaniesBox"
            label={t(
              "admin.landing-page-info.edit.form-mainPageCompaniesBox-label"
            )}
            placeholder={t(
              "admin.landing-page-info.edit.form-mainPageCompaniesBox-placeholder"
            )}
            rows={4}
            maxLength={1000}
            required
          />
          <TextAreaField
            name="mainPageWhatBox"
            label={t("admin.landing-page-info.edit.form-mainPageWhatBox-label")}
            placeholder={t(
              "admin.landing-page-info.edit.form-mainPageWhatBox-placeholder"
            )}
            rows={4}
            maxLength={1000}
            required
          />
          <TextAreaField
            name="mainPageWhoBox"
            label={t("admin.landing-page-info.edit.form-mainPageWhoBox-label")}
            placeholder={t(
              "admin.landing-page-info.edit.form-mainPageWhoBox-placeholder"
            )}
            rows={4}
            maxLength={1000}
            required
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Candidate Page Content</h2>
          <TextAreaField
            name="candidatePageRegistrationBox"
            label={t(
              "admin.landing-page-info.edit.form-candidatePageRegistrationBox-label"
            )}
            placeholder={t(
              "admin.landing-page-info.edit.form-candidatePageRegistrationBox-placeholder"
            )}
            rows={4}
            maxLength={1000}
            required
          />
          <TextAreaField
            name="candidatePageMakeCVBox"
            label={t(
              "admin.landing-page-info.edit.form-candidatePageMakeCVBox-label"
            )}
            placeholder={t(
              "admin.landing-page-info.edit.form-candidatePageMakeCVBox-placeholder"
            )}
            rows={4}
            maxLength={1000}
            required
          />
          <TextAreaField
            name="candidatePageRequestInterviewsBox"
            label={t(
              "admin.landing-page-info.edit.form-candidatePageRequestInterviewsBox-label"
            )}
            placeholder={t(
              "admin.landing-page-info.edit.form-candidatePageRequestInterviewsBox-placeholder"
            )}
            rows={4}
            maxLength={1000}
            required
          />
          <TextAreaField
            name="candidatePageInterviewDayBox"
            label={t(
              "admin.landing-page-info.edit.form-candidatePageInterviewDayBox-label"
            )}
            placeholder={t(
              "admin.landing-page-info.edit.form-candidatePageInterviewDayBox-placeholder"
            )}
            rows={4}
            maxLength={1000}
            required
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Company Page Content</h2>
          <TextAreaField
            name="companyPageWhyBox"
            label={t(
              "admin.landing-page-info.edit.form-companyPageWhyBox-label"
            )}
            placeholder={t(
              "admin.landing-page-info.edit.form-companyPageWhyBox-placeholder"
            )}
            rows={4}
            maxLength={1000}
            required
          />
          <TextAreaField
            name="companyPageRegistrationBox"
            label={t(
              "admin.landing-page-info.edit.form-companyPageRegistrationBox-label"
            )}
            placeholder={t(
              "admin.landing-page-info.edit.form-companyPageRegistrationBox-placeholder"
            )}
            rows={4}
            maxLength={1000}
            required
          />
          <TextAreaField
            name="companyPageBookingBox"
            label={t(
              "admin.landing-page-info.edit.form-companyPageBookingBox-label"
            )}
            placeholder={t(
              "admin.landing-page-info.edit.form-companyPageBookingBox-placeholder"
            )}
            rows={4}
            maxLength={1000}
            required
          />
          <TextAreaField
            name="companyPageRequestInterviewsBox"
            label={t(
              "admin.landing-page-info.edit.form-companyPageRequestInterviewsBox-label"
            )}
            placeholder={t(
              "admin.landing-page-info.edit.form-companyPageRequestInterviewsBox-placeholder"
            )}
            rows={4}
            maxLength={1000}
            required
          />
          <TextAreaField
            name="companyPageInterviewDayBox"
            label={t(
              "admin.landing-page-info.edit.form-companyPageInterviewDayBox-label"
            )}
            placeholder={t(
              "admin.landing-page-info.edit.form-companyPageInterviewDayBox-placeholder"
            )}
            rows={4}
            maxLength={1000}
            required
          />
          <TextAreaField
            name="companyPageBenefitBox"
            label={t(
              "admin.landing-page-info.edit.form-companyPageBenefitBox-label"
            )}
            placeholder={t(
              "admin.landing-page-info.edit.form-companyPageBenefitBox-placeholder"
            )}
            rows={4}
            maxLength={1000}
            required
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Agenda & Location</h2>
          <InputField
            name="agendaInterviewsRange"
            label={t(
              "admin.landing-page-info.edit.form-agendaInterviewsRange-label"
            )}
            placeholder={t(
              "admin.landing-page-info.edit.form-agendaInterviewsRange-placeholder"
            )}
            required
          />
          <InputField
            name="agendaLunchRange"
            label={t(
              "admin.landing-page-info.edit.form-agendaLunchRange-label"
            )}
            placeholder={t(
              "admin.landing-page-info.edit.form-agendaLunchRange-placeholder"
            )}
            required
          />
          <InputField
            name="agendaSnacksRange"
            label={t(
              "admin.landing-page-info.edit.form-agendaSnacksRange-label"
            )}
            placeholder={t(
              "admin.landing-page-info.edit.form-agendaSnacksRange-placeholder"
            )}
            required
          />
          <InputField
            name="locationLine1"
            label={t("admin.landing-page-info.edit.form-locationLine1-label")}
            placeholder={t(
              "admin.landing-page-info.edit.form-locationLine1-placeholder"
            )}
            required
          />
          <InputField
            name="locationLine2"
            label={t("admin.landing-page-info.edit.form-locationLine2-label")}
            placeholder={t(
              "admin.landing-page-info.edit.form-locationLine2-placeholder"
            )}
            required
          />
          <InputField
            name="locationLine3"
            label={t("admin.landing-page-info.edit.form-locationLine3-label")}
            placeholder={t(
              "admin.landing-page-info.edit.form-locationLine3-placeholder"
            )}
            required
          />
        </div>

        {/* New Distribution IDs section */}
        {/* <div className="space-y-4">
          <h2 className="text-xl font-semibold">Distribution IDs</h2>
          <InputField
            name="distribution_degree_id"
            label={t("admin.landingPage.distributionDegreeId")}
            type="text"
            required
          />
          <InputField
            name="distribution_study_fields_id"
            label={t("admin.landingPage.distributionStudyFieldsId")}
            type="text"
            required
          />
        </div> */}

        {/* New Degree Distribution section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Degree Distribution (%)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              name="distributionDegrees.master"
              label={t(
                "admin.landing-page-info.edit.form-distribution-master-label"
              )}
              placeholder={t(
                "admin.landing-page-info.edit.form-distribution-master-placeholder"
              )}
              type="text"
              required
            />
            <InputField
              name="distributionDegrees.bachelor"
              label={t(
                "admin.landing-page-info.edit.form-distribution-bachelor-label"
              )}
              placeholder={t(
                "admin.landing-page-info.edit.form-distribution-bachelor-placeholder"
              )}
              type="text"
              required
            />
            <InputField
              name="distributionDegrees.phd"
              label={t(
                "admin.landing-page-info.edit.form-distribution-phd-label"
              )}
              placeholder={t(
                "admin.landing-page-info.edit.form-distribution-phd-placeholder"
              )}
              type="text"
              required
            />
          </div>
        </div>

        {/* New Study Fields Distribution section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t("admin.landing-page-info.edit.distribution-of-study-fields")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              name="distributionStudyFields.engineering"
              label={t(
                "admin.landing-page-info.edit.form-distribution-engineering-label"
              )}
              placeholder={t(
                "admin.landing-page-info.edit.form-distribution-engineering-placeholder"
              )}
              type="text"
              required
            />
            <InputField
              name="distributionStudyFields.naturalSciences"
              label={t(
                "admin.landing-page-info.edit.form-distribution-naturalSciences-label"
              )}
              placeholder={t(
                "admin.landing-page-info.edit.form-distribution-naturalSciences-placeholder"
              )}
              type="text"
              required
            />
            <InputField
              name="distributionStudyFields.economics"
              label={t(
                "admin.landing-page-info.edit.form-distribution-economics-label"
              )}
              placeholder={t(
                "admin.landing-page-info.edit.form-distribution-economics-placeholder"
              )}
              type="text"
              required
            />
            <InputField
              name="distributionStudyFields.other"
              label={t(
                "admin.landing-page-info.edit.form-distribution-other-label"
              )}
              placeholder={t(
                "admin.landing-page-info.edit.form-distribution-other-placeholder"
              )}
              type="text"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={updateLandingPageInfoMutation.isPending}
        >
          {t("admin.event-day.edit.submit-button-title")}
        </button>
      </Form>
    </Formik>
  );
}
