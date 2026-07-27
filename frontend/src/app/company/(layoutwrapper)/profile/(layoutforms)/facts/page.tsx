import React from "react";
import Head from "next/head";
import { Facts } from "@/app/company/onboarding/facts/_components/Facts";

const page = () => {
  return (
    <main className="w-full">
      <Head>
        <title>Looking for</title>
      </Head>
      <Facts button="save" />
    </main>
  );
};

export default page;
