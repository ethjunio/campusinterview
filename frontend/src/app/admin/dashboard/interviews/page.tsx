import { BackLink } from "@/components/atoms/BackLink";
import { useTranslations } from "next-intl";
import React from "react";
import InterviewAdmin from "./_components/InterviewAdmin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interviews List",
  description: "Interviews List",
};

const InterviewsPage = () => {
  const t = useTranslations();
  return (
    <main className="flex-grow p-8 bg-light-softer">
      <div>
        <BackLink className="mb-12" href="/admin/dashboard">
          {t("admin.back-to-dashboard")}
        </BackLink>

        <InterviewAdmin />
      </div>
    </main>
  );
};

export default InterviewsPage;
