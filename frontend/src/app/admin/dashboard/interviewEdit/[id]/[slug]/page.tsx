import React from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { BackLink } from "@/components/atoms/BackLink";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Interview",
  description: "Edit Interview",
};

const EditInterview = dynamic(() => import("../../_components/EditInterview"));

const EditInterviewPage = () => {
  const t = useTranslations();
  return (
    <main className="flex-grow p-8 bg-light-softer">
      <div>
        <BackLink className="mb-12" href="/admin/dashboard/interviews">
          {t("admin.back-to-interviews")}
        </BackLink>
        <h1 className="mb-8">{t("admin.interviews.edit-interview.title")}</h1>
        <EditInterview />
      </div>
    </main>
  );
};

export default EditInterviewPage;
