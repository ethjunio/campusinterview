"use client";

import TestLogosCarousel from "./TestLogosCarousel";
import LiveLogosCarousel from "./LiveLogosCarousel";
import { useTranslations } from "next-intl";

export const CompanyLogosFeature = () => {
  const t = useTranslations();
  return (
    <div className="max-w-4xl">
      <h1>{t("admin.company-logos-edit.page-title")}</h1>
      <div className="p-8">
        <TestLogosCarousel />
        <hr className="mt-12 mb-12 border-gray-400 border-2" />
        <LiveLogosCarousel />
      </div>
    </div>
  );
};
