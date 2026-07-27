import React from "react";
import Head from "next/head";
import { GeneralForm } from "@/app/company/onboarding/general/_components/GeneralForm";

const page = () => {
  return (
    <main className="w-full">
      <Head>
        <title>Looking for</title>
      </Head>
      <GeneralForm button="save" />
    </main>
  );
};

export default page;
