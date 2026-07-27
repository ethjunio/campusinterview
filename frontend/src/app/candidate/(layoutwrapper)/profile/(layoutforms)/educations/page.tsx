import Head from "next/head";
import React from "react";
import EducationFeatureForm from "./_components/EducationFeatureForm";

const page = () => {
  return (
    <div className="w-full">
      <Head>
        <title>Education</title>
      </Head>
      <EducationFeatureForm />
    </div>
  );
};

export default page;
