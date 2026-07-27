import React from "react";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { Button } from "@/components/atoms/Button";
import { GeneralForm } from "@/app/company/onboarding/general/_components/GeneralForm";
import { ContactForm } from "@/app/company/onboarding/contact/_components/ContactForm";

const page = () => {
  return (
    <main className="w-full">
      <Head>
        <title>Looking for</title>
      </Head>
      <ContactForm button="save" />
    </main>
  );
};

export default page;
