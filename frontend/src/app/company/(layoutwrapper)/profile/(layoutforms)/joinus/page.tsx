import React from "react";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { Button } from "@/components/atoms/Button";
import { GeneralForm } from "@/app/company/onboarding/general/_components/GeneralForm";
import { Joinus } from "@/app/company/onboarding/joinus/_components/joinus";

const page = () => {
  return (
    <main className="w-full">
      <Head>
        <title>Looking for</title>
      </Head>
      <Joinus
        button="save"
      />
    </main>
  );
};

export default page;
