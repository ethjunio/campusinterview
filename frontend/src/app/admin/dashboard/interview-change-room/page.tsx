import { BackLink } from "@/components/atoms/BackLink";
import { useTranslations } from "next-intl";
import React from "react";
import ChangeRoom from "./_components/ChangeRoom";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interview Change Room",
  description: "Interview Change Room",
};

const ChangeRoomPage = () => {
  const t = useTranslations();
  return (
    <main className="flex-grow p-8 bg-light-softer min-h-[91vh]">
      <div>
        <BackLink className="mb-12" href="/admin/dashboard/interviews">
          {t("admin.back-to-interviews")}
        </BackLink>

        <ChangeRoom />
      </div>
    </main>
  );
};

export default ChangeRoomPage;
