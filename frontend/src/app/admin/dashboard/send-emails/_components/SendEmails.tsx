"use client";
import { Button } from "@/components/atoms/Button";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Select from "react-select";
import { useSendEmailMutation } from "@/hooks/admin/useSendEmailMutation";
import { toast } from "sonner";

type OptionType = {
  value: string;
  label: string;
};

const templatesOptions: OptionType[] = [
  { label: "", value: "" },
  { label: "Interview Request Received", value: "interviewRequestReceived" },
  {
    label: "WaitingList Request Received",
    value: "waitingListRequestReceived",
  },
  { label: "Interview Arranged", value: "interviewArranged" },
  { label: "WaitingList Accepted", value: "waitingListAccepted" },
  { label: "New Chat Message", value: "newChatMessage" },
  { label: "Companies Daily Update", value: "companiesDailyUpdate" },
];
const SendEmails = () => {
  const [email, setEmail] = useState("campusinterviewdev@gmail.com");
  const [template, setTemplate] = useState(templatesOptions[0]);
  const [candidateName, setCandidateName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const t = useTranslations();

  const sendEmail = useSendEmailMutation({
    onSuccess: () => {
      toast.success("Email sent successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const handleChange = (option: any) => {
    setTemplate(option);
  };

  const handleSubmit = () => {
    const data = {
      template: template.value,
      email,
      candidateName,
      companyName,
    };
    sendEmail.mutate(data);
  };

  return (
    <div>
      <h2 className="mb-8">{t("admin.send-emails.title")}</h2>

      <div className="max-w-lg vstack vstack-4">
        {/* <div className="danger-text">{error}</div> */}
        <h4 className="pt-4">{t("admin.send-emails.required-fields")}</h4>
        <p>{t("admin.send-emails.fields-description")}</p>
        <p>{t("admin.send-emails.fields-description2")}</p>

        <div>
          <label>{t("admin.send-emails.to-label")}</label>
          <input
            className="form-input block w-full rounded border-[1px] border-solid border-gray-500"
            name="to"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
        </div>
        <div>
          <label>{t("admin.send-emails.template-label")} *</label>

          <Select
            options={templatesOptions}
            placeholder={""}
            onChange={(value) => {
              handleChange(value);
            }}
            value={template}
          />
        </div>

        <h4 className="pt-4">{t("admin.send-emails.optional-fields")}</h4>
        <p>{t("admin.send-emails.fields-description3")}</p>
        <div>
          <label>{t("admin.send-emails.candidate-name-label")}</label>
          <input
            className="form-input block w-full border-[1px] border-solid border-gray-500 rounded"
            name="candidateName"
            value={candidateName}
            onChange={(event) => {
              setCandidateName(event.target.value);
            }}
          ></input>
        </div>

        <div>
          <label>{t("admin.send-emails.company-name-label")}</label>
          <input
            className="form-input block w-full rounded border-[1px] border-solid border-gray-500"
            name="companyName"
            value={companyName}
            onChange={(event) => {
              setCompanyName(event.target.value);
            }}
          ></input>
        </div>

        <Button
          variant="primary-light"
          onClick={handleSubmit}
          //   onClick={async () => {
          //     await sendEmail({
          //       variables: {
          //         input: {
          //           email,
          //           template: template.value as any,
          //           candidateName,
          //           companyName,
          //         },
          //       },
          //     });
          //   }}
        >
          {t("admin.send-emails.send-email")}
        </Button>
      </div>
    </div>
  );
};

export default SendEmails;
