import { BackLink } from "@/components/atoms/BackLink";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import EventDayPage from "./_components/EventDayPage";

export const metadata: Metadata = {
  title: "Event Day Edit",
  description: "Event Day Edit",
};

const Page = async () => {
  const t = await getTranslations();

  return (
    <div className="p-8 max-w-screen-lg">
      <BackLink className="mb-12" href="/admin/dashboard">
        {t("admin.back-to-dashboard")}
      </BackLink>
      <EventDayPage />
    </div>
  );
};

export default Page;
