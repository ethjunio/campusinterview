import React from "react";
import { Metadata } from "next";
import { BackLink } from "@/components/atoms/BackLink";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Interview Create",
  description: "Interview Create",
};

const CreateInterview = dynamic(() => import("./_components/CreateInterview"));
const CreateInterviewPage = () => {
  const t = useTranslations();
  return (
    <main className="flex-grow p-8 bg-light-softer">
      <div>
        <BackLink className="mb-12" href="/admin/dashboard/interviews">
          {t("admin.back-to-interviews")}
        </BackLink>
        <CreateInterview />
      </div>
    </main>
  );
};

export default CreateInterviewPage;
