import { BackLink } from "@/components/atoms/BackLink";
import { getTranslations } from "next-intl/server";
import { AdministerCredentials } from "./_components/AdministerCredentials";
import { Metadata } from "next";

// import { AdministerCredentials } from 'features/admin/AdministerCredentials';

export const metadata: Metadata = {
  title: "Change Company Credentials",
  description: "Change Company Credentials",
};

const ChangeCompanyCredentialsPage = async () => {
  const t = await getTranslations();

  return (
    <main className="flex-grow p-8 bg-light-softer">
      <div className="max-w-screen-md">
        <BackLink className="mb-12" href="/admin/dashboard">
          {t("admin.back-to-dashboard")}
        </BackLink>
      </div>
      <AdministerCredentials />
    </main>
  );
};

export default ChangeCompanyCredentialsPage;
