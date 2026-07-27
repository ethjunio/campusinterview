import { NextPage } from "next";
import { BackLink } from "@/components/atoms/BackLink";
import { Button } from "@/components/atoms/Button";
import { getTranslations } from "next-intl/server";
import LandingPageInfoEditForm from "./_components/LandingPageInfoEditForm";

// import { useTranslation } from 'lib/i18next';

const LandingPageInfoEditPage = async () => {
  const t = await getTranslations();

  return (
    <div className="p-8 max-w-screen-lg">
      <BackLink className="mb-12" href="/admin/dashboard">
        {t("admin.back-to-dashboard")}
      </BackLink>
      <LandingPageInfoEditForm />
    </div>
  );
};

export default LandingPageInfoEditPage;
