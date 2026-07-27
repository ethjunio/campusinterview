import React from "react";
import { Metadata } from "next";
import { BackLink } from "@/components/atoms/BackLink";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Send Emails",
  description: "Send Emails",
};

const SendEmails = dynamic(() => import("./_components/SendEmails"));

export default function SendEmailsPage() {
  const t = useTranslations();
  return (
    <>
      <main className="flex-grow p-8 bg-light-softer min-h-[91vh]">
        <div>
          <BackLink className="mb-12" href="/admin/dashboard">
            {t("admin.back-to-dashboard")}
          </BackLink>

          <SendEmails />
        </div>
      </main>
    </>
  );
}
