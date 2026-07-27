"use client"
import React from "react";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { Button } from "@/components/atoms/Button";
import ParticipantFeatures from "./_components/ParticipantFeatures";
import { useGetLandingPageDataQuery } from "@/hooks/visitors/useGetLandingPageDataQuery";
import OnlineParticipantFeatures from "./_components/onlineCampus/ParticipantFeatures";
import { isOnlineCampusInterview } from "@/utils/interviewBrand";

const page = () => {
  const { data: CampusInterviewService } = useGetLandingPageDataQuery();
  return (
    <main className="w-full">
      <Head>
        <title>Looking for</title>
      </Head>
      {isOnlineCampusInterview(CampusInterviewService?.data?.siteUiFlag) ? (
      <OnlineParticipantFeatures button={"save"}/>
      ) : (
      <ParticipantFeatures button={"save"} />
      )}
    </main>
  );
};

export default page;
