import React from "react";
import { BackLink } from "@/components/atoms/BackLink";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import CompaniesList from "./_components/CompaniesList";

export const metadata: Metadata = {
  title: "Companies",
  description: "Companies",
};

const Companies = async () => {
  const t = await getTranslations();

  return (
    <main className="flex-grow p-8 bg-light-softer">
      <div>
        <BackLink className="mb-12" href="/admin/dashboard">
          {t("admin.back-to-dashboard")}
        </BackLink>
        <h1 className="mb-8">{t("admin.companies-title")}</h1>
        <CompaniesList />
      </div>
    </main>
  );
};

export default Companies;
