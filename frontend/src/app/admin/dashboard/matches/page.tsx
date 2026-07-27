import React from "react";
import Matches from "./_components/Matches";
import { useTranslations } from "next-intl";
import { BackLink } from "@/components/atoms/BackLink";

const page = () => {
  const t = useTranslations();
  return (
    <main className="flex-grow p-8 bg-light-softer">
      <div>
        <BackLink className="mb-12" href="/admin/dashboard">
          {t("admin.back-to-dashboard")}
        </BackLink>

        <Matches />
      </div>
    </main>
  );
};

export default page;
