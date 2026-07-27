import React from "react";

import { Metadata, NextPage } from "next";
import compose from "lodash/fp/compose";
import { BackLink } from "@/components/atoms/BackLink";
import { getTranslations } from "next-intl/server";
import { CandidatesList } from "./_components/CandidatesList";

// import { CandidatesList } from 'features/admin/CandidatesList';

export const metadata: Metadata = {
  title: "Candidates",
  description: "Candidates",
};

const Candidates = async () => {
  const t = await getTranslations();

  return (
    <main className="flex-grow p-8 bg-light-softer">
      <div className="">
        <BackLink className="mb-12" href="/admin/dashboard">
          {t("admin.back-to-dashboard")}
        </BackLink>
        <h1 className="mb-8">{t("admin.candidates-title")}</h1>
        <CandidatesList />
      </div>
    </main>
  );
};

export default Candidates;
