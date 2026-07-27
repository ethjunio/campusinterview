import { BackLink } from "@/components/atoms/BackLink";
import Head from "next/head";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { CompanyLogosFeature } from "./_components/CompanyLogosFeature";

export const metadata: Metadata = {
  title: "Company Logos Carousel",
  description: "Company Logos Carousel",
};

const CompanyLogosCarouselEditPage = async () => {
  const t = await getTranslations();

  return (
    <div className="p-8 max-w-screen-lg">
      <Head>
        <title>{t("admin.company-logos-edit.head-title")}</title>
      </Head>
      <BackLink className="mb-12" href="/admin/dashboard">
        {t("admin.back-to-dashboard")}
      </BackLink>
      <CompanyLogosFeature />
    </div>
  );
};

export default CompanyLogosCarouselEditPage;
